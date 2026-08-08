const router = require("express").Router();
const db = require("../config/database");
const auth = require("../middlewares/auth");

// Criar aposta
router.post("/", auth, async (req, res) => {

    const conexao = await db.getConnection();

    try {
        const {
            data_jogo,
            extracao,
            modalidade,
            colocacao,
            valor,
            numeros
        } = req.body;

        // Usuário autenticado pelo JWT
        const id_usuario = req.usuario.id_usuario;

        // ==========================
        // Validações
        // ==========================
        if (!extracao) {
            return res.status(400).json({
                erro: "Informe a extração."
            });
        }

        if (!data_jogo) {
            return res.status(400).json({
                erro: "Informe a data do jogo."
            });
        }

        if (!modalidade) {
            return res.status(400).json({
                erro: "Informe a modalidade."
            });
        }

        if (!colocacao) {
            return res.status(400).json({
                erro: "Informe a colocação."
            });
        }

        if (!valor || isNaN(valor) || Number(valor) <= 0) {
            return res.status(400).json({
                erro: "Valor da aposta inválido."
            });
        }

        if (!Array.isArray(numeros) || numeros.length === 0) {
            return res.status(400).json({
                erro: "Informe pelo menos um número."
            });
        }

        if (numeros.length > 100) {
            return res.status(400).json({
                erro: "Quantidade máxima de números excedida."
            });
        }

        for (const numero of numeros) {
            if (!/^\d{4}$/.test(numero)) {

                return res.status(400).json({
                    erro: `Número inválido: ${numero}`
                });
            }
        }

        // ==========================
        // Transação
        // ==========================

        await conexao.beginTransaction();

        const [aposta] = await conexao.query( 
            `INSERT INTO apostas(
            id_usuario,
            data_jogo,
            extracao,
            modalidade,
            colocacao,
            valor) VALUES (?,?,?,?,?,?)`,
                [id_usuario,
                data_jogo,
                extracao,
                modalidade,
                colocacao,
                Number(valor)
                ]);

        const id_aposta = aposta.insertId;

        for (const numero of numeros) {

            await conexao.query(
                `INSERT INTO aposta_numeros
                (id_aposta,
                numero)
                VALUES (?,?)`,
                [
                id_aposta,
                numero
                ]
            )}

        await conexao.commit();

        res.status(201).json({

            mensagem: "Aposta realizada com sucesso.",
            id_aposta
        });

    } catch (erro) {

        await conexao.rollback();

        console.error(erro);

        res.status(500).json({

            erro: "Erro interno do servidor."
        });

    } finally {
        conexao.release();
    }

});

router.get("/minhas", auth, async (req, res) => {

    try {

        const id_usuario = req.usuario.id_usuario;

        const [apostas] = await db.query(

            ` SELECT
            a.id_aposta,
            a.modalidade,
            a.extracao,
            a.criado_em,
                GROUP_CONCAT(
                    an.numero
                    ORDER BY an.numero
                    SEPARATOR ','
                ) AS numeros

            FROM apostas a

            LEFT JOIN aposta_numeros an
                ON an.id_aposta = a.id_aposta

            WHERE a.id_usuario = ?

            GROUP BY
                a.id_aposta,
                a.modalidade,
                a.extracao,
                a.criado_em

            ORDER BY a.criado_em DESC`,

            [id_usuario]
        );

        const resultado = apostas.map(aposta => ({

            ...aposta,

            numeros: aposta.numeros
                ? aposta.numeros.split(",")
                : []
        }));

        res.json(resultado);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({

            erro: "Erro ao buscar apostas."
        });
    }
});

module.exports = router;