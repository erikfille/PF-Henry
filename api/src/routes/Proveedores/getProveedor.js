const Proveedor = require("../../models/provedores/Proveedor");
const Usuario = require("../../models/usuarios/Usuario");
const ProductoServicio = require("../../models/productos_servicios/Producto_servicio");

const getProveedorRoutes = [
  {
    method: "GET",
    path: "/proveedores",
    handler: async (request, h) => {
      try {
        const proveedores = await Proveedor.find({})
          .populate("usuarios","id")
          .populate("productos","id")
          
        return h.response(proveedores).code(200);
      } catch (error) {
        console.error(error);
        return h
          .response({
            message:
              "Lo sentimos, ha ocurrido un error al procesar la solicitud.",
          })
          .code(500);
      }
    },
  },
];

module.exports = getProveedorRoutes;
