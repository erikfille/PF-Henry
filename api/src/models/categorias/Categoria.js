const { Schema, model } = require("mongoose");

const categoriaSchema = new Schema({
  tipo: {
    type: String,
    enum: ["Producto", "Servicio"],
    required: true,
  },
  servicios: {
    type: String,
    enum: ["Consulta", "Paseo", "Baño", "Guarderia"],
  },
  productos: {
    type: String,
    enum: ["Juguete", "Alimentos", "Golosinas"],
  },
});

module.exports = model("Categoria", categoriaSchema);

//UN ARRAY CON TODAS LAS CATEGORIAS DE PRODUCTOS, Y UN ARRAY CON TODAS LAS CATEGORIAS DE SERVICIOS
