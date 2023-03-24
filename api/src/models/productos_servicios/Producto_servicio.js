const { Schema, model } = require("mongoose")

const productoServicioSchema = new Schema({
    titulo: {
        type: String,
        required:true
    },
    tipo: {
        type: String,
        enum: ['Producto', 'Servicio'],
        required: true
    },
    precio: {
        type: Number,
        required:true
    },
    imagen: {
        type: Buffer,
        contentType: String
    },
    rating: {
        type: Number,
    },
    stock: {
        type: Number,
        
    },
    activo: {
        type:Boolean
    },
    categoria: {
        type: [{
            type: Schema.Types.ObjectId,
            ref:"Categoria"
        }]
    },
    proveedor: {
        ref:"Proveedor",
        type: Schema.Types.ObjectId
    },
    fechaDeCreacion: {
        type:Date
    }
})

module.exports = model("Producto_servicio", productoServicioSchema)