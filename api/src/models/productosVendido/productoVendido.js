const mongoose = require('mongoose');

const productoVendidoSchema = new mongoose.Schema({
   
      id_producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto_servicio",
    },
      id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
      id_proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
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