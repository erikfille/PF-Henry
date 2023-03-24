const { Schema, model } = require("mongoose");

const ProveedorSchema = new Schema({
  usuarios: { type: Schema.Types.ObjectId, ref: "Usuario" },
  nombre: {
    type: String,
    required: true,
  },
  vendeProductos: {
    type: Boolean,
    required: true,
  },
  vendeServicios: {
    type: Boolean,
    required: true,
  },
  productos: { type: Schema.Types.ObjectId, ref: "Producto_servicio" },
  rating: {
    type: Number,
  },
  direccion: {
    type: String,
    required: true,
  },
  subscripcion: {
    type: String,
    enum: ["VIP", "Normal", "Gratuito"],
    required: true,
  },
  horarioAtencion: {
    type: {
      semana: [
        { type: String }, // abre
        { type: String }, // cierra
      ],
      sabado: [
        { type: String }, // abre
        { type: String }, // cierra
      ],
      domingo: [
        { type: String }, // abre
        { type: String }, // cierra
      ],
    },
    required: true,
  },
});

module.exports = model("Proveedor", ProveedorSchema);
