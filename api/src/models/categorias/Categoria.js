const { Schema, model } = require("mongoose");

const categoriaSchema = new Schema({
  tipo: {
    type: String,
    enum: ["Producto", "Servicio"],
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     if (this.tipo === "Producto") {
    //       return ["Juguete", "Alimentos", "Golosinas", "Higiene","Acuarios","Terrarios","Equitacion"].includes(v);
    //     } else if (this.tipo === "Servicio") {
    //       return ["Consulta", "Paseo", "Baño", "Guarderia","Equitacion"].includes(v);
    //     } else {
    //       return false;
    //     }
    //   },
    //   message: (props) =>
    //     `La categoría "${props.value}" no es válida para el tipo de categoría ${this.tipo}`,
    // },
  },
  status: {
    type: Number,
    default: 1,
    validate: {
      validator: function (v) {
        return v === 0 || v === 1;
      },
      message: (props) =>
        `${props.value} debe ser 0 (Desactivado) o 1 (Activo).`,
    },
  },
});

module.exports = model("Categoria", categoriaSchema);