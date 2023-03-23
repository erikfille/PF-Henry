const ProductoServicio = require("../models/productos_servicios/Producto_servicio");

const createProductosRoutes = [
  {
    method: "POST",
    path: "/crearProducto",
    handler: async (request, h) => {
      try {
        const productoServicio = new ProductoServicio(request.payload);
        await productoServicio.save();
        return h.response(productoServicio).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = createProductosRoutes;
