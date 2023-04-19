const allProductos = require('../../models/productos_servicios/Producto_servicio');

const activeProductosRoutes = [
    {
        method: 'GET',
        path: '/activeProducts',
        handler: async (request, h) => {
            try {
                const productosActivos = await allProductos.find({ activo: true })
                .populate('categoria')
                .populate('proveedor', "nombre")
                .populate("comentarios")
               return h.response(productosActivos);
            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
]


module.exports = activeProductosRoutes