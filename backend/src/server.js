require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 3000;
const db = require("./config/database");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

db.query("SELECT 1")
    .then(() => {
        console.log("MySQL conectado com sucesso!");
    })
    .catch((erro) => {
        console.log("Erro MySQL:", erro);
    });

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );
});