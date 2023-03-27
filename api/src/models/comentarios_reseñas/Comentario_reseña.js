const { Schema, model } = require("mongoose")

const comentarioReseñaSchema = new Schema({
    comentario: {
        type: String,
        required:true
    },
    Fecha: {
        type: Date,
        required:true
    },
    puntuacion: {
        type: Number,
        required:true
    }
})
module.exports=model("Producto_servicio",comentarioReseñaSchema)