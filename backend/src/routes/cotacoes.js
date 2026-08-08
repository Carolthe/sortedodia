const router = require("express").Router();

const db = require("../config/database");

router.get("/", async (req, res) => {

    try {

        const [cotacoes] = await db.query(
            `SELECT
                modalidade,
                cotacao
            FROM cotacoes
            ORDER BY modalidade `
        );

        res.json(cotacoes);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });
    }
});

router.post("/calcular", async (req, res) => {

    try {
        const {modalidade,valor} = req.body;

        if (!modalidade) {

            return res.status(400).json({
                erro: "Modalidade obrigatória."
            });
        }

        if (!valor || Number(valor) <= 0) {

            return res.status(400).json({

                erro: "Valor inválido."
            });
        }

        const [resultado] = await db.query(

            `SELECT cotacao
            FROM cotacoes
            WHERE modalidade = ?`,
            [modalidade]
        );

        if (!resultado.length) {

            return res.status(404).json({
                erro: "Modalidade não encontrada."
            });
        }

        const cotacao = Number(resultado[0].cotacao);

        const premio = Number(valor) * cotacao;

        res.json({

            modalidade,
            valor: Number(valor),
            cotacao,
            premio
        });

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });
    }
});

module.exports = router;