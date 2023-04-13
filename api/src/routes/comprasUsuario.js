const ProductoVendido = require("../models/productosVendido/productoVendido");
const Usuario = require("../models/usuarios/Usuario");

const comprasRoutes = [
  {
    method: "GET",
    path: "/compras/{id_usuario}",
    handler: async (request, h) => {
      try {
        const compras = await ProductoVendido.find({
          id_usuario: request.params.id_usuario,
        }).populate("id_producto id_usuario id_proveedor");
        return compras;
      } catch (error) {
        console.error(error.message);
        return h.response("Error en el servidor").code(500);
      }
    },
  },
];

module.exports = comprasRoutes;
