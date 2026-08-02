const axios = require("axios");

module.exports = axios.create({
    baseURL: "https://api.mercadopago.com",
    headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        "Content-Type": "application/json"
    }
});