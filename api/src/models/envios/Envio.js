const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const envioSchema = new Schema({
  id: { type: Number, required: true },

  direccionDestinatario: { type: String, required: true },

  direccionRemitente: { type: String, required: true },

  comprador: { type: String, required: true },
});

module.exports = mongoose.model("Envio", envioSchema);
