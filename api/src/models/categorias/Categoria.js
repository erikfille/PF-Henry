const { Schema, model } = require("mongoose");

const categoriaSchema = new Schema({
  tipo: {
    type: String,
    enum: ["Producto", "Servicio"],
    required: true,
  },
  categoria: {
    type: String,
    enum: ["Consulta", "Paseo", "Baño", "Guarderia"],
    required: true,
  },
});

module.exports = model("Categoria", categoriaSchema);


//UN ARRAY CON TODAS LAS CATEGORIAS DE PRODUCTOS, Y UN ARRAY CON TODAS LAS CATEGORIAS DE SERVICIOS