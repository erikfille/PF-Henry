const ProductoServicio = require("../../models/productos_servicios/Producto_servicio");

const modifyingProductosRoutes = [
  {
    method: "PUT",
    path: "/producto-servicio/{id}",
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
  },
];

module.exports = modifyingProductosRoutes;
