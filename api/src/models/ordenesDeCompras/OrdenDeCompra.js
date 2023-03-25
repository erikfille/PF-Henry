const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordenDeCompra = new Schema({
  estado: { type: String, required: true },

  comprador: { type: String, required: true },

  productos: { type: Schema.Types.ObjectId, ref: "Producto", required: true },

  envio: { type: Schema.Types.ObjectId, ref: "Envio",required: true },

  monto: { type: Number },

  metodoPago: { type: String },
});

module.exports = mongoose.model("OrdenDeCompra", ordenDeCompra);
