const router = require("express").Router();

const db = require("../config/database");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {

    try {

        const id_usuario = req.usuario.id_usuario;

        const [carteira] = await db.query(
            `
            SELECT *
            FROM carteira
            WHERE id_usuario = ?
            `,
            [id_usuario]
        );

        if (!carteira.length) {

            return res.json({
                saldo: 0,
                bonus: 0
            });

        }

        res.json(carteira[0]);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});

module.exports = router;