const Usuario = require("../models/usuarios/Usuario");
const Rol = require("../models/roles/Rol");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validateUser } = require("../libs/validateFunction");
const Boom = require("@hapi/boom");
const { bienvenidaEmail } = require("../libs/emailFunctions");

const usuariosRoutes = [
  {
    method: "POST",
    path: "/users",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {
        // HAY Q AGREGAR EL ROL
        const { name, surname, email, password, image, rol } = request.payload;

        // Verifico credenciales con Joi
        await validateUser(request.payload);

        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
          return h
            .response({ error: "El correo electrónico ya está registrado" })
            .code(409);
        }

        let rolEncontrado = null;
        // Buscar el rol por su nombre si se especifica
        if (rol) {
          rolEncontrado = await Rol.findOne({ nombre: rol });
          // Si el rol no existe, devolver un error
          if (!rolEncontrado) {
            return Boom.badRequest("El rol especificado no existe");
          }
        }

        // Crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const rolPorDefecto = await Rol.findOne({ nombre: 'customer' });
        const user = new Usuario({
          name,
          surname,
          email,
          password: hashedPassword,
          image,
          rol: rolPorDefecto 
        });

        if (user.image === "") {
          // Si es un string vacío, asignamos el valor por defecto
          user.image =
            "https://st.depositphotos.com/1146092/3960/i/950/depositphotos_39605893-stock-photo-silly-computer-dog.jpg";
        }
        await user.save();

        // Crear un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 72, // 72 horas
        });

        bienvenidaEmail(email, name);

        return h.response({
          user: {
            token: token,
            name: user.name,
            id: user.id,
            email: user.email,
            image: user.image,
            rol,
          },
        });
      } catch (error) {
        console.log(error);
        if (Boom.isBoom(error)) {
          return error;
        }
      }
    },
  },
  {
    method: "POST",
    path: "/users/login",
    options: {
      payload: {
        allow: ["application/json"],
        parse: true,
      },
      async handler(request, h) {
        // El usuario ya está autenticado en este punto, puedes usar la información del usuario en "request.user"

        const { email, password } = request.payload;

        try {
          // Buscar el usuario por su email y contraseña y hacer el populate del campo "rol"
          const usuario = await Usuario.findOne({ email }).populate("rol");

          if (!usuario) {
            return h
              .response({ error: "El correo electrónico no coincide" })
              .code(401);
          }

          // Verificar si el usuario está activo
          if (usuario.status === 0) {
            return h
              .response({ error: "El usuario está desactivado" })
              .code(401);
          }

          // Validar la contraseña normalmente
          const validatePass = await Usuario.comparePassword(
            password,
            usuario.password
          );
          if (!validatePass) {
            throw Boom.unauthorized("Invalid Password");
          }

          // Crear un token JWT con información del usuario
          const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 72 } // 72 horas
          );

          return h.response({
            user: {
              token: token,
              name: usuario.name,
              id: usuario.id,
              email: usuario.email,
              image: usuario.image,
              rol: usuario.rol ? usuario.rol.nombre : usuario.rol,
            },
          });
        } catch (error) {
          if (Boom.isBoom(error)) {
            return error;
          } else {
            return h.response({ error: "Error al crear el usuario" }).code(404);
          }
        }
      },
    },
  },
  {
    method: "POST",
    path: "/users/GoogleLogin",
    options: {
      async handler(request, h) {
        const { email, password, name, surname, image } = request.payload;

        try {
          // Buscar el usuario por su email.
          const usuario = await Usuario.findOne({ email }).populate("rol");

          

          // si no encuentra el email, lo creamos y guardamos en la base de datos.
          if (!usuario) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const rolPorDefecto = await Rol.findOne({ nombre: 'customer' });
            const user = new Usuario({
              name,
              surname,
              email,
              password: hashedPassword,
              image,
              rol: rolPorDefecto 
            });
    
            if (user.image === "") {
              // Si es un string vacío, asignamos el valor por defecto
              user.image =
                "https://st.depositphotos.com/1146092/3960/i/950/depositphotos_39605893-stock-photo-silly-computer-dog.jpg";
            }
            await user.save();
            // Crear un token JWT
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 72, // 72 horas
            });

            bienvenidaEmail(email, name);

            // Devolvemos objeto user con su info + el token generado
            return h.response({
              user: {
                token: token,
                name: user.name,
                id: user.id,
                email: user.email,
                image: user.image,
              },
            });
          }

          // En caso que si encuentre el usuario en la base de datos, validamos su password

          // Verificar si el usuario está activo

          const validatePass = await Usuario.comparePassword(
            password,
            usuario.password
          );
          if (!validatePass) {
            throw Boom.unauthorized("Invalid Password");
          }

          if (!usuario.rol) {
            throw Boom.badRequest("Role not selected");
          }

          if (usuario.status === 0) {
            return h
              .response({ error: "El usuario está desactivado" })
              .code(401);
          }

          const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 72, // 72 horas
          });

          // Si sus credenciales son validas respondemos con la data del user + el token generado
          return h.response({
            user: {
              token: token,
              name: usuario.name,
              id: usuario.id,
              email: usuario.email,
              image: usuario.image,
              rol: usuario.rol ? usuario.rol.nombre : usuario.rol,
            },
          });
        } catch (error) {
          if (Boom.isBoom(error)) {
            return error;
          } else {
            return h.response({ error: "Error al crear el usuario" }).code(404);
          }
        }
      },
      payload: {
        allow: ["application/json"],
        parse: true,
      },
    },
  },
  {
    method: "GET",
    path: "/users/{id}",
    options: {
      async handler(request, h) {
        const { id } = request.params;

        try {
          const usuario = await Usuario.findById(id)
            .populate("rol")
            .populate({
              path: "id_mascota",
              populate: {
                path: "historial",
              },
            })
            .populate({
              path: "productosComprados",
              model: "ProductoServicio",
              select: "titulo",
            });
          const usuarioSinPassword = usuario.toObject(); // convertir el objeto Mongoose a objeto JS
          delete usuarioSinPassword.password; // eliminar la propiedad password
          return h.response(usuarioSinPassword);
        } catch (error) {
          return h.response({ error: "Error al obtener el usuario" }).code(500);
        }
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}/role",
    handler: async (request, h) => {
      const { id } = request.params;
      const { role } = request.payload;
      try {
        // Buscar el usuario por su id
        const usuario = await Usuario.findById(id);
        // Si el usuario no existe, devolver un error
        if (!usuario) {
          return h.response({ error: "El usuario no existe" }).code(404);
        }
        // Si se especificó un rol en la solicitud, buscar el rol por su nombre
        if (role) {
          const rolEncontrado = await Rol.findOne({ nombre: role });
          // Si el rol no existe, devolver un error
          if (!rolEncontrado) {
            return h
              .response({ error: "El rol especificado no existe" })
              .code(400);
          }
          // Actualizar el rol del usuario
          usuario.rol = rolEncontrado._id;
        }

        // Guardar los cambios en la base de datos
        await usuario.save();
        const usuarioGuardado = await Usuario.findById(id)
          .select("name surname image rol email")
          .populate("rol");
        return h.response(usuarioGuardado);
      } catch (error) {
        return h
          .response({ error: "Error al actualizar el usuario" })
          .code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      try {
        const users = await Usuario.find().select(
          "name surname email image password address status"
        );
        return h.response(users);
      } catch (err) {
        return h.response(err).code(500);
      }
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: async (request, h) => {
      try {
        const id = request.params.id;
        const update = request.payload;
        const users = await Usuario.findByIdAndUpdate(id, update, {
          new: true,
        });
        return users;
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = usuariosRoutes;
