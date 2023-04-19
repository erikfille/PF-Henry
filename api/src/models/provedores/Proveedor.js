const { Schema, model } = require("mongoose");

const ProveedorSchema = new Schema({
  usuarios: { type: Schema.Types.ObjectId, ref: "Usuario" },
  nombre: {
    type: String,
    required: true,
  },
  vendeProductos: {
    type: Boolean,
   
  },
  vendeServicios: {
    type: Boolean,
   
  },
  productos: [{ type: Schema.Types.ObjectId, ref: "ProductoServicio" }],
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
  pais: {
    type: String,
  },
  tipo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  email: {
    type: String,
  },
  telefono: {
    type: String,
  },
  horarioAtencion: {
    type: {
      semana: [
        { type: String },
        { type: String },
      ],
      sabado: [
        { type: String },
        { type: String },
      ],
      domingo: [
        { type: String },
        { type: String },
      ],
    },
    required: true,
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
  image: {
    type: String,
  },
});

module.exports = model("Proveedor", ProveedorSchema);
