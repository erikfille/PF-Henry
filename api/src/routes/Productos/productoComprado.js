const Usuario = require("../../models/usuarios/Usuario");
const ProductoVendido = require("../../models/productosVendido/productoVendido");

const productoCompradoRoutes = [
  {
    method: "POST",
    path: "/compraUsuario",
    handler: async (request, h) => {
      try {
        const { id_usuario, id_producto,fechaDeCreacion } = request.payload;

        if (!id_producto) {
          throw new Error(
            'El payload debe incluir una propiedad "id_producto"'
          );
        }

        const newProductoVendido = new ProductoVendido({
          id_producto,
          id_usuario,
          fechaDeCreacion
        });

        await newProductoVendido.save();

        await Usuario.findByIdAndUpdate(id_usuario, {
          $push: {
            productosComprados: id_producto,
          },
        });

        return h.response("Orden de compra creada exitosamente").code(201);
      } catch (err) {
        console.error(err);
        return h
          .response("Ha ocurrido un error al crear la orden de compra")
          .code(500);
      }
    },
  },
];

module.exports = productoCompradoRoutes;
