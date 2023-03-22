const { Schema, model, models } = require("mongoose")

const categoriaSchema = new Schema({
    categoria: {
        type: String,
        required:true
   }

})

module.exports = model("Categoria", categoriaSchema)