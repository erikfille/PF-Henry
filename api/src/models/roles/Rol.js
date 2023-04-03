const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    enum: ["admin", "customer", "provider"], 
    required: true,
  }
});

const Rol = mongoose.model('Rol', rolSchema, 'roles');

module.exports = Rol;