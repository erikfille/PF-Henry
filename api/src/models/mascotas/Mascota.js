const { Schema, model } = require('mongoose');

const mascotaSchema = new Schema({
  nombre: {
    type: String,
    
  },
  especie: {
    type: String,
    
  },
  fechaDeNacimiento: {
    type: String,
    
  },
  descripcion: {
    type: String,
    
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
    
  },
  imagen: {
    type:String
  },
  historial: [{
      type: Schema.Types.ObjectId,
      ref: 'HistorialAnimal',
      
  }]
});

module.exports = model('Mascota', mascotaSchema);