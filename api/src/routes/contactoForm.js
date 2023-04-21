const Joi = require("joi");
const nodemailer = require("nodemailer");
const { contactoForm } = require("../libs/emailFunctions");
require("dotenv").config();

const contactoFormRoutes = [
  {
    method: "POST",
    path: "/contact",
    handler: async (request, h) => {
      const { name, email, message } = request.payload;
      try {
        contactoForm(email, name, message);
        return h.response("Mensaje enviado correctamente").code(200);
      } catch (error) {
        console.error(error);
        return h.response("Ocurrió un error al enviar el mensaje").code(500);
      }
    },
  },
];

module.exports = contactoFormRoutes;
