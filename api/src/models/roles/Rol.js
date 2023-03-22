const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  
rol: {
    type: String,
    required: true
  }
});

const Rol = mongoose.model('Rol', rolSchema,"rols");

module.exports = Rol;