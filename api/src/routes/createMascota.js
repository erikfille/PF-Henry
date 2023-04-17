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
          imagen: request.payload.imagen,
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
        const mascotas = await Mascota.find({ usuario: usuarioId })
          .populate("usuario", "name surname")
          .select("-__v"); // quita el campo "__v"
        return h.response(mascotas).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "PUT",
    path: "/mascotas/{mascotaId}",
    handler: async (request, h) => {
      try {
        const mascotaId = request.params.mascotaId;
        const updatedMascota = await Mascota.findByIdAndUpdate(
          mascotaId,
          {
            $set: {
              nombre: request.payload.nombre,
              especie: request.payload.especie,
              fechaDeNacimiento: request.payload.fechaDeNacimiento,
              descripcion: request.payload.descripcion,
              imagen: request.payload.imagen,
            },
          },
          { new: true }
        );
        return h.response(updatedMascota).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "DELETE",
    path: "/mascotas/{mascotaId}",
    handler: async (request, h) => {
      try {
        const mascotaId = request.params.mascotaId;

        const deletedMascota = await Mascota.findByIdAndDelete(mascotaId);

        await Usuario.findByIdAndUpdate(
          deletedMascota.usuario,
          { $pull: { id_mascota: mascotaId } },
          { new: true }
        );

        return h.response(deletedMascota).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = createMascotaRoutes;
