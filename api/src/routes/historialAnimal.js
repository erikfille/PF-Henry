const HistorialAnimal = require("../models/historialAnimal/Historial");
const Mascota = require("../models/mascotas/Mascota");
const Usuario = require("../models/usuarios/Usuario");

const historialRoutes = [
  {
    method: "POST",
    path: "/historial/{mascotaId}",
    handler: async (request, h) => {
      try {
        const historial = new HistorialAnimal({
          fecha: request.payload.fecha,
          titulo: request.payload.titulo,
          descripcion: request.payload.descripcion,
        });
        const mascotaId = request.params.mascotaId;

        const mascota = await Mascota.findByIdAndUpdate(
          mascotaId,
          { $push: { historial: historial._id } },
          { new: true }
        );
        historial.mascota = mascota

        await historial.save()

        return h.response(historial).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/historial/{mascotaId}",
    handler: async (request, h) => {
      try {
        const mascotaId = request.params.mascotaId;
        const historial = await HistorialAnimal.find({ mascota: mascotaId })
        
          
        return h.response(historial).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  }

];

module.exports = historialRoutes;
