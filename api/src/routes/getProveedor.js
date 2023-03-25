const Proveedor = require("../models/provedores/Proveedor");

const getProveedorRoutes = [
  {
    method: "GET",
    path: "/proveedores",
    handler: async (request, h) => {
      try {
        const proveedores = await Proveedor.find({}, "-usuarios -productos");
        return h.response(proveedores).code(200);
      } catch (error) {
        console.error(error); // Opcional: imprimir el error en la consola para debug
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
