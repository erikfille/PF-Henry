const { Schema, model, models } = require("mongoose")

const categoriaSchema = new Schema({
    categoria: {
        type: Array,
        required:true
   }

})

module.exports = model("Categoria", categoriaSchema)