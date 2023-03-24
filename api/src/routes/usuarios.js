const Usuario = require("../models/usuarios/Usuario");
const Rol = require("../models/roles/Rol");

const usuariosRoutes = [
  {
    method: "POST",
    path: "/users",
    options: {
      async handler(request, h) {
        const { name, surname, email, rol, password, address } = request.payload;
        try {
          let rolEncontrado = null;
          // Buscar el rol por su nombre si se especifica
          if (rol) {
            rolEncontrado = await Rol.findOne({ nombre: rol });
            // Si el rol no existe, devolver un error
            if (!rolEncontrado) {
              return h.response({ error: "El rol especificado no existe" }).code(400);
            }
          }
          // Crear un nuevo usuario con el rol encontrado o sin rol
          const nuevoUsuario = new Usuario({
            name,
            surname,
            email,
            rol: rolEncontrado ? rolEncontrado._id : null,
            password,
            address,
            productsVisited: [],
          });
          await nuevoUsuario.save();
          return h.response(nuevoUsuario);
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
          const usuario = await Usuario.findOne({ email }).populate("rol");
          
          // Si el usuario es proveedor, agregar la propiedad "proveedor_id"
      // if (usuario.rol.nombre === "proveedor") {
      //   usuario.proveedor_id = usuario._id;
      // }

          return h.response(usuario);
        } catch (error) {
          return h.response({ error: "Error al obtener el usuario" }).code(500);
        }
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
    const { rol } = request.payload;
      try {
        // Buscar el usuario por su id
      const usuario = await Usuario.findById(id);
      // Si el usuario no existe, devolver un error
      if (!usuario) {
        return h.response({ error: "El usuario no existe" }).code(404);
      }
      // Si se especificó un rol en la solicitud, buscar el rol por su nombre
      if (rol) {
        const rolEncontrado = await Rol.findOne({ nombre: rol });
        // Si el rol no existe, devolver un error
        if (!rolEncontrado) {
          return h.response({ error: "El rol especificado no existe" }).code(400);
        }
        // Actualizar el rol del usuario
        usuario.rol = rolEncontrado._id;
      }
      // Guardar los cambios en la base de datos
      await usuario.save();
      return h.response(usuario);
      } catch (error) {
        return h.response({ error: "Error al actualizar el usuario" }).code(500);
      }
    }
 }



];

module.exports = usuariosRoutes;
