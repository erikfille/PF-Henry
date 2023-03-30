const Hapi = require('hapi');
const mongoose = require('mongoose');
const { Order } = require("../models/orders/order");

// SDK de Mercado Pago
const mercadoPago = require('mercadopago');

const { ACCESS_TOKEN } = process.env;

// Agrega credenciales
mercadoPago.configure({
  access_token: ACCESS_TOKEN
});

const carrito = [
  {title: "Producto 1", quantity: 5, price: 10.52},
  {title: "Producto 2", quantity: 15, price: 100.52},
  {title: "Producto 3", quantity: 6, price: 200},
];

const item_ml = carrito.map(i => ({
  title: i.title,
  unit_price: i.price,
  quantity: i.quantity,
}));

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000,
});

// Ruta que genera la URL de MercadoPago
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    const id_orden = 1;

    // Crea un objeto de preferencia
    let preference = {
      items: items_ml,
      external_reference: `${id_orden}`,
      payment_methods: {
        excluded_payment_types: [
          {
            id: "atm"
          }
        ],
        installments: 3 //cantidad maximo de cuotas
      },
      back_urls: {
        success: 'http://localhost:3000/mercadopago/pagos',
        failuire: 'http://localhost:3000/mercadopago/pagos',
        pending: 'http://localhost:3000/mercadopago/pagos'
      },
    };

    mercadoPago.preferences.create(preference)
    .then(function(response){
      console.info("respondio")
      //este valor reemplazara el string "<%= global.id %>" en tu HTML
      global.id = response.body.id;
      console.log(response.body)
      return h.response({id: global.id}).code(200);
    })
    .catch(function (error){
      console.log(error);
      return h.response(error).code(500);
    });
  }
});

// RECIBE LA INFORMACION DEL PAGO
server.route({
  method: 'GET',
  path: '/pagos',
  handler: (request, h) => {
    console.info("EN LA RUTA PAGOS", request.query);
    const payment_id = request.query.payment_id;
    const payment_status = request.query.status;
    const external_reference = request.query.external_reference;
    const merchant_order_id = request.query.merchant_order_id;
    console.log("EXTERNAL REFERENCE", external_reference);

    // STATUS DE LA ORDEN
    Order.findOneAndUpdate({ _id: external_reference }, {
      payment_id: payment_id,
      payment_status: payment_status,
      merchant_order_id: merchant_order_id,
      status: "completed",
    })
    .then((order) => {
      console.info('Salvando order');
      return h.redirect("http://localhost:3000").code(302);
    })
    .catch((err) => {
      console.error('error al salvar', err);
      return h.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`).code(500);
    })
    .catch((err) => {
        console.error('error al buscar', err);
        return h.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`).code(500);
      })
  },
});

// Busco informacion de una orden de pago
server.route({
  method: "GET",
  path: "/pagos/{id}",
  handler: (request, h) => {
    const mp = new mercadoPago(ACCESS_TOKEN);
    const id = request.params.id;
    console.info("Buscando el id", id);
  },
});