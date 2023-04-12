const HistorialAnimal = require("../models/historialAnimal/Historial");
const Mascota = require("../models/mascotas/Mascota");
const Usuario = require("../models/usuarios/Usuario");

const historialRoutes = [
  {
    method: "POST",
    path: "/historial/{mascotaId}",
    handler: async (request, h) => {
      try {
        const mascotaId = request.params.mascotaId;
        const mascota = await Mascota.findById(mascotaId);
        if (!mascota) {
          return h
            .response({ message: "No se encontró la mascota." })
            .code(404);
        }

        const historial = new HistorialAnimal({
          fecha: request.payload.fecha,
          titulo: request.payload.titulo,
          descripcion: request.payload.descripcion,
        });

        await historial.save();
        mascota.historial.push(historial._id);
        await mascota.save();

        return h.response(historial).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = historialRoutes;
