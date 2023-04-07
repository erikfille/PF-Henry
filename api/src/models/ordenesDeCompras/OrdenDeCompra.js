const {Schema,model} = require("mongoose");

const ordenDeCompra = new Schema({
  estado: { type: String },

  comprador: { type: Schema.Types.ObjectId, ref: "Usuario" },

  productos: { type: Schema.Types.ObjectId, ref: "ProductoServicio" },

  envio: { type: Schema.Types.ObjectId, ref: "Envio"},

  monto: { type: Number },

  metodoPago: { type: String },
});

module.exports = model("OrdenDeCompra", ordenDeCompra);
