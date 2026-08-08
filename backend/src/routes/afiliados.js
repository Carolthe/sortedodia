const express = require("express");
const router = express.Router();
const db = require("../config/database"); 

router.post("/", async (req, res) => {
    try {
        const { nome, whatsapp, descricao_divulgacao } = req.body;

        if (!nome || !whatsapp || !descricao_divulgacao) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preencha todos os campos."
            });
        }

        const sql = `INSERT INTO afiliados
            (nome, whatsapp, descricao_divulgacao, criado_em)
            VALUES (?, ?, ?, NOW())`;

        await db.execute(sql, [
            nome,
            whatsapp,
            descricao_divulgacao
        ]);

        return res.status(201).json({
            sucesso: true,
            mensagem: "Solicitação enviada com sucesso."
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro interno do servidor."
        });
    }
});

module.exports = router;