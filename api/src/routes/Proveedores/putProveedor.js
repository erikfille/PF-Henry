const Proveedor = require("../../models/provedores/Proveedor");

const modifyingProveedorRoutes = [
  {
    method: 'PUT',
    path: '/proveedor/{id}',
    handler: async (request, h) => {
      try {
        const id = request.params.id;
        const update = request.payload;
        const opciones = { new: true, runValidators: true }; // Opciones para devolver el objeto actualizado y ejecutar las validaciones definidas en el esquema
        const proveedorActualizado = await Proveedor.findOneAndUpdate({_id: id}, {$push: {productos: update.productos}}, opciones);
        return proveedorActualizado;
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = modifyingProveedorRoutes;