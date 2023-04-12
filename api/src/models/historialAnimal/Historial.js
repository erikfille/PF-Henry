const { Schema, model } = require('mongoose');

const historialAnimalSchema = new Schema({
  fecha: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
});

module.exports = model('HistorialAnimal', historialAnimalSchema);
