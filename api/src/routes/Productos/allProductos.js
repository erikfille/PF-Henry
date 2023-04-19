const allProductos = require('../../models/productos_servicios/Producto_servicio');


const allProductosRoutes = [
    {
        method: 'GET',
        path: '/allProducts',
        handler: async (request, h) => {
            try {
                const productosActivos = await allProductos.find()
                .populate('categoria')
                .populate('proveedor', "nombre")
               return h.response(productosActivos);
            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
]


module.exports = allProductosRoutes