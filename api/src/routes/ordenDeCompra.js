const OrdenDeCompra = require("../models/ordenesDeCompras/OrdenDeCompra");

const compraDetailRoutes = [
  {
    method: 'GET',
    path: '/ordenDeCompra/{id}',
    handler: async (request, h) => {
      try {
        const compra = await OrdenDeCompra.findById(request.params.id)
          .populate({
            path: "comprador",
            select:"name surname email address"
          })
          .populate("productos", "titulo")
          .populate("envio")
        
        
        
        
        return h.response(compra);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  },

  {
    method: 'POST',
    path: '/ordenDeCompra',
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
