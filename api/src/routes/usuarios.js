const Usuario = require("../models/usuarios/Usuario");
const Rol = require("../models/roles/Rol");
const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const transporter = require("../nodemailerConfig")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const accountTransport = require('../account_transport.json');
const {validateNewUser, validateUser, validate} = require('../libs/validateFunction');
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
        const { name, surname, email, password } = request.payload;
  
        // Verifico credenciales con Joi
        await validateUser(request.payload);

        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
          return h.response({ error: 'El correo electrónico ya está registrado' }).code(409);
        }
  
        // Crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Usuario({ name, surname, email, password: hashedPassword });
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
  
        return h.response({email: user.email, name: user.name, token: token});

      } catch (error) {
        console.log(error)
        return h.response({ error: 'Error al crear el usuario' }).code(500);
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
          const usuario = await Usuario.findOne({ email, password }).populate("rol");
          console.log(usuario)
          if (!usuario) {
            return h.response({ error: "El correo electrónico o la contraseña no coinciden" }).code(401);
          }
  
          return h.response(usuario);
        } catch (error) {
          return h.response({ error: "Error al obtener el usuario" }).code(500);
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
