const { Schema, model } = require("mongoose");
const ProductoServicio = require("../productos_servicios/Producto_servicio.js")

const comentarioResenaSchema = new Schema({
  comentario: {
    type: String,
  },

  fecha: {
    type: Date,
    default: Date.now,
  },

  puntuacion: {
    type: Number,
    validate: {
      validator: function(v) {
        return v >= 0 && v <= 5;
      },
      message: props => `${props.value} debe ser un número entre 0 y 5.`,
    },
  },

  producto: { 
    type: Schema.Types.ObjectId, 
    ref: "ProductoServicio", 
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});



module.exports = model("ComentarioResena", comentarioResenaSchema);
