const { MercadoPagoConfig, Payment } = require("mercadopago");


const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_TOKEN
});


const payment = new Payment(client);


module.exports = payment;