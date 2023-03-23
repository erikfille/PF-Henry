const mongoose = require('mongoose');

const productoVendidoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
      id_producto: {
        type: String,
        required: true,
    },
      id_usuario: {
        type: String,
        required: true,
        unique: true
    },
      id_proveedor: {
        type: String,
        required: true
    },
      precio: {
        type: Number,
        required: true
    },
      fecha: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.modelo('productoVendido', productoVendidoSchema)