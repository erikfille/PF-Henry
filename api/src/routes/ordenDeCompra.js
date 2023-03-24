const ordenDeCompra = require("../models/ordenesDeCompras/OrdenDeCompra");

const compraDetailRoutes = [
  {
    method: 'GET',
    path: '/compra-detail/{id}',
    handler: async (request, h) => {
      try {
        const compra = await ordenDeCompra.findById(request.params.id);
        return h.response(compra);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/compra-detail',
    handler: async (request, h) => {
      try {
        
        const newCompra = new ordenDeCompra(request.payload);
        
        const savedCompra = await newCompra.save();
        return h.response(savedCompra).code(201);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  }
];

module.exports = compraDetailRoutes;
