const ProductoServicio = require("../../models/productos_servicios/Producto_servicio");

const modifyingProductosRoutes = [
  {
    method: "PUT",
    path: "/producto-servicio/{id}",
    options: {
      auth: 'jwt', // Agrega autenticación jwt
    handler: async (request, h) => {
      try {
        const id = request.params.id;
        const update = request.payload;
        const productoServicio = await ProductoServicio.findByIdAndUpdate(
          id,
          update,
          {
            new: true,
          }
        );
        return productoServicio;
      } catch (error) {
        return h.response(error).code(500);
      }
    }, 
      payload: {
      allow: ["application/json"],
      parse: true,
    },
  },
}
];

module.exports = modifyingProductosRoutes;
