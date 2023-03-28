const { Schema, model } = require("mongoose");

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
