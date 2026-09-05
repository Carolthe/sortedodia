const router = require("express").Router();
const db = require("../config/database");
const auth = require("../middlewares/auth");
const axios = require("../config/moneyOut");
const crypto = require("crypto");

// ======================================
// CONFIGURAÇÕES
// ======================================

const SAQUE_MINIMO = 0.10;

// ======================================
// SOLICITAR SAQUE PIX AUTOMÁTICO
// ======================================

router.post("/", auth, async (req, res) => {

    const conexao = await db.getConnection();

    let id_saque = null;

    try {

        await conexao.beginTransaction();

        const id_usuario = req.usuario.id_usuario;

        const {
            valor,
            tipo_documento,
            tipo_chave,
            chave_pix,
            nome_titular,
            cpf_titular
        } = req.body;

        // ======================================
        // VALIDAÇÃO
        // ======================================

        if (
            valor === undefined ||
            valor === null ||
            !tipo_documento ||
            !tipo_chave ||
            !chave_pix ||
            !nome_titular ||
            !cpf_titular
        ) {

            await conexao.rollback();

            return res.status(400).json({
                erro: "Preencha todos os campos."
            });
        }

        const valorNumerico = Number(valor);

        if (
            !Number.isFinite(valorNumerico) ||
            valorNumerico <= 0
        ) {

            await conexao.rollback();

            return res.status(400).json({
                erro: "Informe um valor válido."
            });
        }

        // Trabalha sempre com 2 casas decimais
        const valorSaque = Number(
            valorNumerico.toFixed(2)
        );

   if (valorSaque < SAQUE_MINIMO) 
    { await conexao.rollback(); 
        return res.status(400).json({ erro: "O saque mínimo é R$ 0,10." }); }

        // ======================================
        // BUSCA SALDO
        // FOR UPDATE BLOQUEIA A LINHA
        // ======================================

        const [usuarios] = await conexao.query(
            `
            SELECT saldo
            FROM usuarios
            WHERE id_usuario = ?
            FOR UPDATE
            `,
            [id_usuario]
        );

        if (!usuarios.length) {

            await conexao.rollback();

            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        const saldoAtual = Number(
            usuarios[0].saldo
        );

        if (saldoAtual < valorSaque) {

            await conexao.rollback();

            return res.status(400).json({
                erro: "Saldo insuficiente."
            });
        }

        // ======================================
        // RESERVA/DESCONTA O SALDO AGORA
        //
        // Isso impede que o usuário faça
        // vários saques simultâneos usando
        // o mesmo saldo.
        // ======================================

        const [resultadoSaldo] = await conexao.query(
            `
            UPDATE usuarios
            SET saldo = saldo - ?
            WHERE id_usuario = ?
              AND saldo >= ?
            `,
            [
                valorSaque,
                id_usuario,
                valorSaque
            ]
        );

        if (resultadoSaldo.affectedRows !== 1) {

            await conexao.rollback();

            return res.status(400).json({
                erro: "Saldo insuficiente."
            });
        }

        // ======================================
        // CRIA SAQUE
        // ======================================

        const [resultado] = await conexao.query(
            `
            INSERT INTO saques
            (
                id_usuario,
                valor,
                tipo_chave,
                chave_pix,
                nome_titular,
                cpf_titular,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                id_usuario,
                valorSaque,
                tipo_chave,
                chave_pix,
                nome_titular,
                cpf_titular,
                "processing"
            ]
        );

        id_saque = resultado.insertId;

        await conexao.commit();

        // ======================================
        // ENVIA MONEY OUT
        // ======================================

        try {

            /*
             * A chave é derivada do próprio saque.
             *
             * Se sua API aceitar uma nova tentativa,
             * reutilizar a mesma chave impede que uma
             * repetição acidental crie outra transferência.
             */
            const idempotencyKey =
                `SAQUE_${id_saque}`;

            const transferencia = await axios.post(
                "/v1/transaction-intents/process",
                {
                    external_reference:
                        `SAQUE_${id_saque}`,

                    point_of_interaction: {
                        type: "PSP_TRANSFER"
                    },

                    transaction: {

                        from: {
                            accounts: [
                                {
                                    amount: valorSaque
                                }
                            ]
                        },

                        to: {
                            accounts: [
                                {
                                    type: "current",

                                    amount: valorSaque,

                                    chave: {
                                        type: tipo_chave,
                                        value: chave_pix
                                    },

                                    owner: {
                                        identification: {
                                            type:
                                                tipo_documento,
                                            number:
                                                cpf_titular
                                        }
                                    }
                                }
                            ]
                        },

                        total_amount:
                            valorSaque
                    }
                },
                {
                    headers: {
                        "X-Idempotency-Key":
                            idempotencyKey
                    }
                }
            );

            const idTransferencia =
                transferencia.data?.id;

            const statusTransferencia =
                transferencia.data?.status ||
                "processing";

            if (!idTransferencia) {

                throw new Error(
                    "Mercado Pago não retornou o ID da transferência."
                );
            }

            await db.query(
                `
                UPDATE saques
                SET
                    id_transferencia_mp = ?,
                    status = ?
                WHERE id_saque = ?
                `,
                [
                    idTransferencia,
                    statusTransferencia,
                    id_saque
                ]
            );

            return res.json({
                mensagem:
                    "Saque enviado para processamento.",

                id_saque,

                status:
                    statusTransferencia
            });

        } catch (mpError) {

            console.error(
                "Erro Mercado Pago:",
                mpError.response?.data ||
                mpError.message
            );

            // ======================================
            // DEVOLVE O SALDO
            // ======================================

            const conexaoErro =
                await db.getConnection();

            try {

                await conexaoErro.beginTransaction();

                /*
                 * Só devolve o dinheiro se o saque ainda
                 * estiver processing.
                 *
                 * Isso evita devolver duas vezes.
                 */

                const [saqueAtual] =
                    await conexaoErro.query(
                        `
                        SELECT
                            id_saque,
                            id_usuario,
                            valor,
                            status
                        FROM saques
                        WHERE id_saque = ?
                        FOR UPDATE
                        `,
                        [id_saque]
                    );

                if (
                    saqueAtual.length &&
                    saqueAtual[0].status === "processing"
                ) {

                    await conexaoErro.query(
                        `
                        UPDATE usuarios
                        SET saldo = saldo + ?
                        WHERE id_usuario = ?
                        `,
                        [
                            saqueAtual[0].valor,
                            saqueAtual[0].id_usuario
                        ]
                    );

                    await conexaoErro.query(
                        `
                        UPDATE saques
                        SET status = 'rejected'
                        WHERE id_saque = ?
                        `,
                        [id_saque]
                    );
                }

                await conexaoErro.commit();

            } catch (erroRollback) {

                await conexaoErro.rollback();

                console.error(
                    "Erro ao devolver saldo:",
                    erroRollback
                );

            } finally {

                conexaoErro.release();
            }

            return res.status(500).json({
                erro:
                    "Erro ao enviar saque. O valor foi devolvido ao saldo."
            });
        }

    } catch (error) {

        try {
            await conexao.rollback();
        } catch (_) {}

        console.error(
            "Erro ao solicitar saque:",
            error
        );

        return res.status(500).json({
            erro:
                "Erro ao solicitar saque."
        });

    } finally {

        conexao.release();
    }
});

// ======================================
// WEBHOOK MONEY OUT
// ======================================

router.post("/webhook", async (req, res) => {

    const conexao = await db.getConnection();

    try {

        console.log(
            "===== WEBHOOK SAQUE ====="
        );

        console.log(req.body);

        const id_transferencia =
            req.body?.data?.id;

        if (!id_transferencia) {
            return res.sendStatus(200);
        }

        // ======================================
        // CONSULTA STATUS NO MERCADO PAGO
        // ======================================

        const transferencia =
            await axios.get(
                `/v1/transaction-intents/${id_transferencia}`
            );

        const status =
            transferencia.data?.status;

        console.log(
            "Status transferência:",
            status
        );

        // ======================================
        // LOCALIZA O SAQUE
        // ======================================

        const [saques] = await conexao.query(
            `
            SELECT
                id_saque,
                id_usuario,
                valor,
                status
            FROM saques
            WHERE id_transferencia_mp = ?
            LIMIT 1
            `,
            [id_transferencia]
        );

        if (!saques.length) {

            console.log(
                "Saque não encontrado:",
                id_transferencia
            );

            return res.sendStatus(200);
        }

        const saque = saques[0];

        // ======================================
        // SAQUE JÁ FINALIZADO
        //
        // Webhooks podem ser repetidos.
        // Não processamos novamente.
        // ======================================

        if (
            saque.status === "approved" ||
            saque.status === "rejected"
        ) {

            console.log(
                "Webhook já processado:",
                saque.id_saque
            );

            return res.sendStatus(200);
        }

        await conexao.beginTransaction();

        // ======================================
        // APROVADO
        //
        // O saldo já foi descontado quando o saque
        // foi criado.
        //
        // PORTANTO NÃO DESCONTAR NOVAMENTE.
        // ======================================

        if (status === "approved") {

            await conexao.query(
                `
                UPDATE saques
                SET status = 'approved'
                WHERE id_saque = ?
                  AND status = 'processing'
                `,
                [saque.id_saque]
            );

            await conexao.commit();

            console.log(
                "Saque aprovado:",
                saque.id_saque
            );

            return res.sendStatus(200);
        }

        // ======================================
        // REJEITADO / CANCELADO
        // ======================================

        if (
            status === "rejected" ||
            status === "cancelled"
        ) {

            /*
             * Bloqueia o registro para garantir que
             * duas notificações simultâneas não
             * devolvam o dinheiro duas vezes.
             */

            const [saqueBloqueado] =
                await conexao.query(
                    `
                    SELECT
                        id_saque,
                        id_usuario,
                        valor,
                        status
                    FROM saques
                    WHERE id_saque = ?
                    FOR UPDATE
                    `,
                    [saque.id_saque]
                );

            if (
                saqueBloqueado.length &&
                saqueBloqueado[0].status === "processing"
            ) {

                await conexao.query(
                    `
                    UPDATE usuarios
                    SET saldo = saldo + ?
                    WHERE id_usuario = ?
                    `,
                    [
                        saqueBloqueado[0].valor,
                        saqueBloqueado[0].id_usuario
                    ]
                );

                await conexao.query(
                    `
                    UPDATE saques
                    SET status = 'rejected'
                    WHERE id_saque = ?
                    `,
                    [saque.id_saque]
                );
            }

            await conexao.commit();

            console.log(
                "Saque rejeitado/devolvido:",
                saque.id_saque
            );

            return res.sendStatus(200);
        }

        // ======================================
        // OUTROS STATUS
        // ======================================

        await conexao.query(
            `
            UPDATE saques
            SET status = ?
            WHERE id_saque = ?
              AND status = 'processing'
            `,
            [
                status || "processing",
                saque.id_saque
            ]
        );

        await conexao.commit();

        return res.sendStatus(200);

    } catch (error) {

        try {
            await conexao.rollback();
        } catch (_) {}

        console.error(
            "Erro webhook saque:",
            error.response?.data ||
            error.message ||
            error
        );

        /*
         * Retornamos 500 para permitir que o provedor
         * tente novamente o webhook.
         */
        return res.sendStatus(500);

    } finally {

        conexao.release();
    }
});

module.exports = router;