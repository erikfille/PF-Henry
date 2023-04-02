const Usuario = require('../models/usuarios/Usuario');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const Joi = require('joi');


// --- Para el hapi-basic
const validate = async (request, email, password) => {

    const user = await Usuario.findOne({ email }).populate('rol');
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await bcrypt.compare(password, user.password);
    const credentials = { id: user._id, email: user.email, rol: user.rol.nombre};

    return { isValid, credentials };
};
// ----------------------
const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    surname: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    adress: Joi.string().min(3).max(18),
    rol: Joi.string().min(4).required(),
    image: Joi.string().required()
  });
  
  const userSchema2 = Joi.object({
    password: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required(),
  });

  const validateUser = (user) => {
    const { error, value } = userSchema.validate(user);
    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      throw Boom.badRequest(message);
    }
    return value;
  };

  async function validateLogin(email, password) {
    const { error, value } = userSchema2.validate(email, password);
    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      throw Boom.badRequest(message);
    }
    return value;
  }
module.exports = {
    validateLogin,
    validate,
    validateUser
}

