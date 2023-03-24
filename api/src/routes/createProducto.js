const ProductoServicio = require("../models/productos_servicios/Producto_servicio")

const createProductosRoutes = [
  {
    method: "POST",
    path: "/crearProducto",
    handler: async (request, h) => {
      try {
        const { titulo, tipo, precio, imagen, rating, stock, activo, categoria, proveedor } = request.payload;
        const nuevoProductoServicio = new ProductoServicio({
          titulo,
          tipo,
          precio,
          imagen,
          rating,
          stock,
          activo,
          categoria,
          proveedor,
        });
        const productoServicioGuardado = await nuevoProductoServicio.save();
        return h.response(productoServicioGuardado).code(201);
      } catch (error) {
        return h.response(error.message).code(500);
      }
    },
  },
];

module.exports = createProductosRoutes;
