const Proveedor = require("../../models/provedores/Proveedor");
const Usuario = require("../../models/usuarios/Usuario");

const createProveedorRoutes = [
  {
    method: "POST",
    path: "/crearProveedor",
    handler: async (request, h) => {
      try {
        const proveedor = new Proveedor(request.payload);
        await proveedor.save();


        await Usuario.findByIdAndUpdate(
          request.payload.usuarios,
          { $push: { proveedores: proveedor._id } },
          {new:true}
       )   

        return h.response(proveedor).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = createProveedorRoutes;
