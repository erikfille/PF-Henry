const { Schema, model} = require("mongoose")

const categoriaSchema = new Schema({
    categoria: {
        type: Array,
        required:true
   },
   producto_Servicio: {
        ref: 'Producto_servicio',
        type: Schema.Types.ObjectId
   }
})

module.exports = model("Categoria", categoriaSchema)