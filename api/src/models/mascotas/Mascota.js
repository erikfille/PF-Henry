const {Schema, model} = require('mongoose')


const mascotaSchema = new Schema({
   
    nombre: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required:true
    },
    fechaDeNacimiento: {
        type: String,
        required:true
    },
    descripcion: {
        type: String,
        required: true
    }

  
})

module.exports = model('Mascota', mascotaSchema);