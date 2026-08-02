const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                erro: "Token não informado."
            });
        }

        const [, token] = authHeader.split(" ");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (erro) {

        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });

    }
};