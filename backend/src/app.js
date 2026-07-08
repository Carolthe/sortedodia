const express = require("express");
const cors = require("cors");


const usuarioRoutes = require("./routes/usuarios");
const apostaRoutes = require("./routes/aposta");
const carteiraRoutes = require("./routes/carteira");
const resultadoRoutes = require("./routes/resultado");



const app = express();


app.use(cors());

app.use(express.json());



// teste API

app.get("/", (req, res) => {

    res.json({
        mensagem: "API Sorte Todo Dia funcionando"
    });

});



// Rotas

app.use(
    "/usuarios",
    usuarioRoutes
);


app.use(
    "/apostas",
    apostaRoutes
);


app.use(
    "/carteira",
    carteiraRoutes
);


app.use(
    "/resultados",
    resultadoRoutes
);



module.exports = app;