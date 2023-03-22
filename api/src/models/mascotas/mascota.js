const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true,
    },
    fecha_Nacimiento: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },

});

module.export = mongoose.model('mascota', mascotaSchema);