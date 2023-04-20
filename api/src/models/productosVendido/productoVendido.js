const mongoose = require('mongoose');

const productoVendidoSchema = new mongoose.Schema({
   
      id_producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductoServicio",
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
    },
    fechaDeCreacion: {
      type: Date,
      default: Date.now,
    },
});

module.exports = mongoose.model('productoVendido', productoVendidoSchema)