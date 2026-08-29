const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarios");
const apostaRoutes = require("./routes/aposta");
const carteiraRoutes = require("./routes/carteira");
const resultadoRoutes = require("./routes/resultado");
const selectsRoutes = require("./routes/selects");
const proximosResultadosRoutes = require("./routes/proximosResultados");
const afiliadosRoutes = require("./routes/afiliados");
const pagamentosRoutes = require("./routes/pagamentos");
const cotacoesRoutes = require("./routes/cotacoes");

const app = express();

/**
 * =========================================================
 * CORS
 * =========================================================
 */

const allowedOrigins = [
    "https://sortedodia10-sooty.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
];

const corsOptions = {
    origin: function (origin, callback) {

        // Permite requisições sem Origin
        // Ex.: Postman, curl ou comunicação entre servidores
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new Error(`Origem não permitida pelo CORS: ${origin}`)
        );
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],

    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

/**
 * =========================================================
 * MIDDLEWARES
 * =========================================================
 */

app.use(express.json());

/**
 * =========================================================
 * TESTE DA API
 * =========================================================
 */

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API Sorte Todo Dia funcionando"
    });
});

/**
 * =========================================================
 * ROTAS
 * =========================================================
 */

app.use("/usuarios", usuarioRoutes);
app.use("/apostas", apostaRoutes);
app.use("/carteira", carteiraRoutes);
app.use("/resultados", resultadoRoutes);
app.use("/selects", selectsRoutes);
app.use("/proximos-resultados", proximosResultadosRoutes);
app.use("/afiliados", afiliadosRoutes);
app.use("/pagamentos", pagamentosRoutes);
app.use("/cotacoes", cotacoesRoutes);

module.exports = app;