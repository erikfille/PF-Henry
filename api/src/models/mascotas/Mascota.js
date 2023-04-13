const { Schema, model } = require('mongoose');

const mascotaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  especie: {
    type: String,
    required: true
  },
  fechaDeNacimiento: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length <= 200;
      },
      message: props => `La descripción debe tener como máximo 200 caracteres.`
    }
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  imagen: {
    type:String
  },
  historial: [{
      type: Schema.Types.ObjectId,
      ref: 'HistorialAnimal',
      required: true
  }]
});

module.exports = model('Mascota', mascotaSchema);