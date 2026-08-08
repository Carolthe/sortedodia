const express = require("express");
const router = express.Router();
const payment = require("../config/mercadopago");
const db = require("../config/database");
const auth = require("../middlewares/auth");

// ==================================================
// CRIAR PAGAMENTO PIX
// ==================================================

router.post("/pix", auth, async (req, res) => {

    try {
        const { valor } = req.body;

        const usuario_id =
            req.usuario.id_usuario;

        if (!valor || Number(valor) <= 0) {

            return res.status(400).json({

                erro: "Valor inválido."
            });
        }

        const [usuarios] = await db.query(
            `SELECT email
                FROM usuarios
                WHERE id_usuario=?`,
            [usuario_id]
        );

        if (!usuarios.length) {

            return res.status(404).json({

                erro: "Usuário não encontrado."
            });
        }

        const pagamento = await payment.create({
            body: {
                transaction_amount:
                    Number(valor),
                description: "Recarga de saldo",
                payment_method_id: "pix",
                payer: { email: usuarios[0].email },

                metadata: {
                    usuario_id: String(usuario_id)
                }
            }
        });


        await db.query(
            `INSERT INTO pagamentos
            (id_usuario,
            id_mercado_pago,
            valor,
            status) VALUES (?,?,?,?)`,
            [usuario_id, pagamento.id, Number(valor), pagamento.status]);

        res.json({
            id: pagamento.id, qr_code:
                pagamento
                    .point_of_interaction
                    .transaction_data
                    .qr_code,
            qr_code_base64:
                pagamento
                    .point_of_interaction
                    .transaction_data
                    .qr_code_base64
        });

    } catch (error) {
        console.error(
            "Erro criar PIX:",
            error
        );

        res.status(500).json({
            erro: "Erro ao criar PIX."
        });
    }
});
// ==================================================
// WEBHOOK MERCADO PAGO
// ==================================================
router.post("/webhook", async (req, res) => {
    console.log("========== WEBHOOK ==========");
    console.log(req.body);

    try {
        console.log(
            "Webhook:",
            req.body
        );

        const pagamento_id =
            req.body?.data?.id;

        if (!pagamento_id) {
            return res.sendStatus(200);
        }

        const pagamento =
            await payment.get({
                id:
                    pagamento_id
            });

        console.log(
            "Pagamento:",
            pagamento.status);

        if (
            pagamento.status !== "approved"
        ) {
            return res.sendStatus(200);
        }
        // procura no banco
        const [dados] =
            await db.query(
                `SELECT *
                FROM pagamentos
                WHERE id_mercado_pago=?`,
                [pagamento_id]);

        if (!dados.length) {
            console.log(
                "Pagamento não encontrado"
            );

            return res.sendStatus(200);
        }

        const registro =
            dados[0];

        // evita adicionar saldo duas vezes

        if (
            registro.status === "approved"
        ) {
            console.log("Já processado");

            return res.sendStatus(200);
        }

        // adiciona saldo

        await db.query(`UPDATE usuarios
            SET saldo = saldo + ?
            WHERE id_usuario=?`,
            [registro.valor, registro.id_usuario]
        );
        const [carteira] = await db.query(
            `SELECT id_carteira
            FROM carteira
            WHERE id_usuario = ?`,
            [dados[0].id_usuario]);

        if (carteira.length) {

            await db.query(
                `UPDATE carteira
            SET saldo = saldo + ?
            WHERE id_usuario = ?`,
                [dados[0].valor, dados[0].id_usuario]);
        } else {

            await db.query(`
        INSERT INTO carteira
        (id_usuario, saldo, bonus)
        VALUES (?,?,?)`,
                [dados[0].id_usuario, dados[0].valor, 0]);
        }

        // atualiza pagamento

        await db.query(
            `UPDATE pagamentos
            SET status='approved'
            WHERE id_mercado_pago=?`,
            [pagamento_id]
        );

        console.log(
            "Saldo creditado:",
            registro.id_usuario,
            registro.valor
        );

        return res.sendStatus(200);

    } catch (error) {

        console.error(
            "Erro webhook:",
            error
        );

        return res.sendStatus(500)
    }
});

// ==================================================
// CONSULTAR PAGAMENTO
// ==================================================

router.get("/:id", auth, async (req, res) => {

    try {

        const pagamento = await payment.get({
            id: req.params.id
        });

        // Se foi aprovado, atualiza o banco (caso ainda não tenha atualizado)
        if (pagamento.status === "approved") {

            const [dados] = await db.query(
                `SELECT *
                FROM pagamentos
                WHERE id_mercado_pago = ?
                `,
                [req.params.id]
            );

            if (
                dados.length &&
                dados[0].status !== "approved"
            ) {

                // Atualiza pagamento
                await db.query(
                    `UPDATE pagamentos
                    SET status = 'approved'
                    WHERE id_mercado_pago = ?`, [req.params.id]);

                // Credita saldo
                await db.query(
                    `UPDATE usuarios
                    SET saldo = saldo + ?
                    WHERE id_usuario = ?`,
                    [dados[0].valor, dados[0].id_usuario]);

                console.log("Saldo atualizado:", dados[0].id_usuario, dados[0].valor);
            }
        }

        return res.json({
            status: pagamento.status,
            valor: pagamento.transaction_amount
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            erro: "Erro ao consultar pagamento."
        });
    }
});

module.exports = router;