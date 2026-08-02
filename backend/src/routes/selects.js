const express = require("express");
const router = express.Router();
const db = require("../config/database"); // ajuste conforme seu projeto

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM selects_jogo ORDER BY id_selects_jogo"
    );

    res.json(rows);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar selects." });
  }
});

module.exports = router;