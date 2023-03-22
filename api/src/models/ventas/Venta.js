const {Schema, model} = require('mongoose')


const VentasSchema = new Schema({
    ordenDeCompra: {type: Schema.Types.ObjectId, ref: "OrdenDeCompra"},  
    envios: {type: Schema.Types.ObjectId, ref: "Envio"},
    factura: {
        type: Buffer,
        contentType: String,
        required: true
    }
})

module.exports = model('Ventas', VentasSchema);