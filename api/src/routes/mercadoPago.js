const  Order  = require("../models/orders/order");
const mercadoPago = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

// VER, TODO ESTE CODIGO ES UNA TRADUCCIÓN DEL VIDEO
// PEGAR ESTO EN EL .env ===>  ACCESS_TOKEN="APP_USR-978483548395546-032915-cfd449705131844f3bfbc84b226cb755-15032579"
// REVISAR EN FUNCIÓN DE LO QUE NOS HACE FALTA.

mercadoPago.configure({
  access_token: ACCESS_TOKEN
});

// const carrito = [
//   {title: "Producto 1", quantity: 5, price: 10.52},
//   {title: "Producto 2", quantity: 15, price: 100.52},
//   {title: "Producto 3", quantity: 6, price: 200},
// ];

// // Convertir el carrito de compras en un arreglo de items de MercadoPago
// const item_ml = carrito.map(i => ({
//   title: i.title,
//   unit_price: i.price,
//   quantity: i.quantity,
// }));

const mercadoPagoRoutes = [
  {
    method: 'POST',
    path: '/',
    handler: async (request, h) => {
      const {id, items, installments } = request.payload;
    
      let preference = {
        items: items,
        external_reference: id,
        payment_methods: {
          excluded_payment_types: [
            {
              id: "atm"
            }
          ],
          installments: installments
        },
        back_urls: {
          success: 'http://localhost:3000/mercadopago/pagos',
          failure: 'http://localhost:3000/mercadopago/pagos',
          pending: 'http://localhost:3000/mercadopago/pagos'
        },
      };

     
    
      try {
        const response = await mercadoPago.preferences.create(preference);
        global.id = response.body.sandbox_init_point;
        console.log(response.body);
        return h.response({id: global.id}).code(200);
      } catch (error) {
        console.log(error);
        return h.response(error).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/pagos',
    handler: async (request, h) => {
      const payment_id = request.query.payment_id;
      const payment_status = request.query.status;
      const external_reference = request.query.external_reference;
      const merchant_order_id = request.query.merchant_order_id;
  
      try {
        const order = await Order.findOneAndUpdate({ _id: external_reference }, {
          payment_id: payment_id,
          payment_status: payment_status,
          merchant_order_id: merchant_order_id,
          status: "completed",
        });
        console.info('Salvando order');
        return h.redirect("http://localhost:3000").code(302);
      } catch (err) {
        console.error('error al salvar', err);
        return h.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/pagos/{id}",
    handler: (request, h) => {
      const mp = new mercadoPago(ACCESS_TOKEN);
      const id = request.params.id;
      console.info("Buscando el id", id);
    },
  },
];

module.exports = mercadoPagoRoutes;


//Ruta chekoutbricks en node.js

// var mercadopago = require('mercadopago');
// mercadopago.configurations.setAccessToken("YOUR_ACCESS_TOKEN");

// mercadopago.payment.save(req.body)
//   .then(function(response) {
//     const { status, status_detail, id } = response.body;
//     res.status(response.status).json({ status, status_detail, id });
//   })
//   .catch(function(error) {
//     console.error(error);
//   });
