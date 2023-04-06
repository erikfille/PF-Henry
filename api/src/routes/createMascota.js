const Mascota = require("../models/mascotas/Mascota");
const Usuario = require("../models/usuarios/Usuario");

const createMascotaRoutes = [
  {
    method: "POST",
    path: "/mascotas/{userId}",
    handler: async (request, h) => {
      try {
        const mascota = new Mascota({
          nombre: request.payload.nombre,
          especie: request.payload.especie,
          fechaDeNacimiento: request.payload.fechaDeNacimiento,
          descripcion: request.payload.descripcion,
          usuario: request.params.userId, // asignar el usuario a la mascota
        });

        const usuarioId = request.params.userId;

        // Agregar la mascota a la lista de mascotas del usuario
        const usuario = await Usuario.findByIdAndUpdate(
          usuarioId,
          { $push: { id_mascota: mascota._id } },
          { new: true }
        ).populate(
          "id_mascota",
          "nombre especie fechaDeNacimiento descripcion"
        );

        // Asignar el usuario a la mascota
        mascota.usuario = usuario;

        await mascota.save();

        return h.response(mascota).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/mascotas/{userId}",
    handler: async (request, h) => {
      try {
        const usuarioId = request.params.userId;
        const mascotas = await Mascota.find({ usuario: usuarioId });
        return h.response(mascotas).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = createMascotaRoutes;
