const Proveedor = require("../models/provedores/Proveedor");

const createProveedorRoutes = [
  {
    method: "POST",
    path: "/crearProveedor",
    handler: async (request, h) => {
      try {
        const proveedor = new Proveedor(request.payload);
        await proveedor.save();
        return h.response(proveedor).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = createProveedorRoutes;
