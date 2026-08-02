const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id_proximos_resultados,
        hora,
        data,
        local,
        descricao
      FROM proximos_resultados
      ORDER BY data ASC, hora ASC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar próximos resultados." });
  }
});

module.exports = router;