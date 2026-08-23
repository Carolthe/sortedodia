const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarios");
const apostaRoutes = require("./routes/aposta");
const carteiraRoutes = require("./routes/carteira");
const resultadoRoutes = require("./routes/resultado");
const selectsRoutes = require("./routes/selects");
const proximosResultados = require("./routes/proximosResultados");
const afiliadosRoutes = require("./routes/afiliados");
const pagamentosRoutes = require("./routes/pagamentos");
const cotacoes = require("./routes/cotacoes");
const saquesRoutes = require("./routes/saques");

const app = express();

const allowedOrigins = [
  "https://sortedodia-sigma.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json());

// teste API

app.get("/", (req,res)=>{
    res.json({ mensagem: "API Sorte Todo Dia funcionando"});
});

// ROTAS
app.use("/usuarios", usuarioRoutes);
app.use("/apostas", apostaRoutes);
app.use("/carteira", carteiraRoutes);
app.use("/resultados", resultadoRoutes);
app.use("/selects", selectsRoutes);
app.use("/proximos-resultados", proximosResultados);
app.use("/afiliados", afiliadosRoutes);
app.use("/pagamentos", pagamentosRoutes);
app.use("/cotacoes", cotacoes);
// app.use("/saques", saquesRoutes);

module.exports = app;