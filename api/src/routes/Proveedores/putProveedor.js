const Proveedor = require("../../models/provedores/Proveedor");

const modifyingProveedorRoutes = [
  {
    method: 'PUT',
    path: '/proveedor/{id}',
    handler: async (request, h) => {
      try {
        const id = request.params.id;
        const update = request.payload;
        const opciones = { new: true, runValidators: true };
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(
          id,
          update,
          opciones
        );
        return proveedorActualizado;
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];


module.exports = modifyingProveedorRoutes;