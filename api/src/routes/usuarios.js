const Usuario = require("../models/usuarios/Usuario");
const Rol = require("../models/roles/Rol");
const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const transporter = require("../nodemailerConfig")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const accountTransport = require('../account_transport.json');
const {validateUser} = require('../libs/validateFunction');
const Boom = require('@hapi/boom');

const usuariosRoutes = [
  {
    method: 'POST',
    path: '/users',
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      try {

        // HAY Q AGREGAR EL ROL 
        const { name, surname, email, password, image, rol} = request.payload;

        // Verifico credenciales con Joi
        await validateUser(request.payload);

        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
          return h.response({ error: 'El correo electrónico ya está registrado' }).code(409);
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
        const user = new Usuario({ 
          name,
          surname, 
          email, 
          password: hashedPassword, 
          image, 
          rol: rolEncontrado ? rolEncontrado._id : null
        });
        await user.save();
  
        // Crear un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 72 // 72 horas
        });
  
        // Enviar un correo electrónico de bienvenida al usuario
        const transporter = nodemailer.createTransport(accountTransport);
        
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: '¡Bienvenido a nuestra aplicación!',
          text: `¡Hola ${name}, bienvenido a nuestra aplicación!`,
        };
  
        await transporter.sendMail(mailOptions);
  
        return h.response({user: {token: token, name: user.name, id: user.id, email: user.email, image: user.image, rol}});

      } catch (error) {
        if (Boom.isBoom(error)) {
          return error;
        } else {
          return h.response({ error: 'Error al crear el usuario' }).code(418);
        }
      }
    },
  },
  {
    method: "POST",
    path: "/users/login",
    options: {
      async handler(request, h) {
        const { email, password } = request.payload;
  
        try {

          // Buscar el usuario por su email y contraseña y hacer el populate del campo "rol"
          const usuario = await Usuario.findOne({ email }).populate("rol");

          if (!usuario) {
            return h.response({ error: "El correo electrónico no coincide" }).code(401);
          }
          
          const validatePass = await Usuario.comparePassword(password, usuario.password);
          if (!validatePass) {
            throw Boom.unauthorized("Invalid Password");
          }
           // Crear un token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 72 // 72 horas
        });

        return h.response({user: {token: token, name: usuario.name, id: usuario.id, email: usuario.email, image: usuario.image}});
        }  catch (error) {
          if (Boom.isBoom(error)) {
            return error;
          } else {
            return h.response({ error: 'Error al crear el usuario' }).code(418);
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
    method: "POST",
    path: "/users/GoogleLogin",
    options: {
      async handler(request, h) {
        const { email, password, name, surname, image } = request.payload;
  
        try {

          // Buscar el usuario por su email.
          const usuario = await Usuario.findOne({ email });
          // si no encuentra el email, lo creamos y guardamos en la base de datos.
          if (!usuario) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Usuario({ name, surname, email, password: hashedPassword, image});
        await user.save();
       // Crear un token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 72 // 72 horas
      });
      // Devolvemos objeto user con su info + el token generado
        return h.response({user: {token: token, name: user.name, id: user.id, email: user.email, image: user.image}});
          }

      // En caso que si encuentre el usuario en la base de datos, validamos su password
          const validatePass = await Usuario.comparePassword(password, usuario.password);
          if (!validatePass) {
            throw Boom.unauthorized("Invalid Password");
          }
          const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 72 // 72 horas
          });

      // Si sus credenciales son validas respondemos con la data del user + el token generado
          return h.response({user: {token: token, name: usuario.name, id: usuario.id, email: usuario.email, image: usuario.image}});
    
        } catch (error) {
          if (Boom.isBoom(error)) {
            return error;
          } else {
            return h.response({ error: 'Error al crear el usuario' }).code(418);
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
    path: "/users/{email}",
    options: {
      async handler(request, h) {
        const { email } = request.params;
  
        try {
          const usuario = await Usuario.findOne({ email }).populate("rol");
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
