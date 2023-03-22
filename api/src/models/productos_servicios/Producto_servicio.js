const { Schema, model } = require("mongoose")

const productoServicioSchema = new Schema({
    titulo: {
        type: String,
        required:true
    },
    esProducto: {
        type: Boolean,
        required:true
    },
    esServicio:{
        type: Boolean,
        required:true
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
    fechaDeCreacion: {
        type:Date
    }

})

module.exports = model("Producto_servicio", productoServicioSchema)