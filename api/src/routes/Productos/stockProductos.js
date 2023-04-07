const Productos_servicios = require("../../models/productos_servicios/Producto_servicio");

const stockProductosRoutes = [
  {
    method: "PUT",
    path: "/stock/{idProducto}",
    options: {
      auth: 'jwt', // Agrega autenticación jwt
    async handler(request, h) {
      const { idProducto } = request.params;
      let { stock } = request.payload;

      // Verificar si la stock es un número
      if (isNaN(stock)) {
        return h
          .response({
            mensaje: "El stock debe ser un número",
          })
          .code(400);
      }

      // Convertir stock a un número
      stock = parseInt(stock);

      try {
        // Actualizar el stock del producto
        let update = { $inc: { stock: stock } };
        if (stock < 0) {
          update = { $inc: { stock: stock } };
        }

        const producto = await Productos_servicios.findOneAndUpdate(
          { _id: idProducto },
          update,
          { new: true }
        );

        if (!producto) {
          return h
            .response({
              mensaje: "No se pudo actualizar el stock del producto",
            })
            .code(400);
        }

        return h
          .response({
            mensaje: "Stock actualizado exitosamente",
            producto,
          })
          .code(200);
      } catch (error) {
        console.log(error);
        return h
          .response({
            mensaje: "Ocurrió un error interno del servidor",
          })
          .code(500);
      }
    },
    payload: {
      allow: ["application/json"],
      parse: true,
    },
  },
},
];

module.exports = stockProductosRoutes;
