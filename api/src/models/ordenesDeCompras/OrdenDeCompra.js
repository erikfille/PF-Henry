const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordenDeCompra = new Schema({
  id: { type: Number, required: true },

  estado: { type: String, required: true },

  comprador: { type: String, required: true },

  productos: { type: Schema.Types.ObjectId, ref: "Producto", required: true },

  envio: { type: String, required: true },

  monto: { type: Number, required: true },

  metodoPago: { type: String, required: true },
});

module.exports = mongoose.model("Modelo", ordenDeCompra);
