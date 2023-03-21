const {Schema, model} = require('mongoose')


const ProveedorSchema = new Schema({
    usuarios: {type: Schema.Types.ObjectId, ref: "Usuario"}, 
    nombre: {
        type: String,
        required: true
    },
    vendeProductos: {
        type: Boolean,
        required: true
    },
    vendeServicios: {
        type: Boolean,
        required: true
    },
    productos: {type: Schema.Types.ObjectId, ref: "Producto_servicio"},
    rating: {
        type: Number
    },
    direccion: {
        type: String,
        required: true
    }
  
})

module.exports = model('Proveedor', ProveedorSchema);