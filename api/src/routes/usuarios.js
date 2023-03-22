const Usuario = require("../models/usuarios/Usuario");
const Rol = require("../models/roles/Rol");

const usuariosRoutes = [
  {
    method: "POST",
    path: "/users",
    options: {
      async handler(request, h) {
        const { name, surname, email, rol, password, address } =
          request.payload;
        try {
          // Buscar el rol por su nombre
          const rolEncontrado = await Rol.findOne({ rol })
          // Si el rol no existe, devolver un error
          if (!rolEncontrado) {
            return h
              .response({ error: "El rol especificado no existe" })
              .code(400);
          }
          // Crear un nuevo usuario con el rol encontrado
          const nuevoUsuario = new Usuario({
            name,
            surname,
            email,
            rol: rolEncontrado._id,
            password,
            address,
            productsVisited: [],
          });
          await nuevoUsuario.save();
          return h.response(nuevoUsuario);
        } catch (error) {
          return h.response({ error: "Error al crear el usuario" }).code(500);
        }
      },
    },
    },
 {
    method: "GET",
    path: "/users/{email}",
    options: {
      async handler(request, h) {
        const { email } = request.params;

        try {
          // Buscar el usuario por su id y hacer el populate del campo "rol"
          const usuario = await Usuario.findOne({email}).populate("rol");

          return h.response(usuario);
        } catch (error) {
          return h.response({ error: "Error al obtener el usuario" }).code(500);
        }
      },
    },
  },



];

module.exports = usuariosRoutes;
