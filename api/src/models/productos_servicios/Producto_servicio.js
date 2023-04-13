const { Schema, model } = require("mongoose");

const productoServicioSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['Producto', 'Servicio'],
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  animal: {
    type:String
  },
  rating: {
      type: Number,
      default: 0,
 
  
  },
  stock: {
    type: Number,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: props => `${props.value} debe ser un número positivo.`
    },
  },
  activo: {
    type: Boolean,
    default: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
},
  proveedor: {
    type: Schema.Types.ObjectId,
    ref: "Proveedor",
  },
  fechaDeCreacion: {
    type: Date,
    default: Date.now,
  },
  comentarios: [{
    type: Schema.Types.ObjectId,
    ref: "ComentarioResena"
  }]
});



module.exports = model("ProductoServicio", productoServicioSchema);