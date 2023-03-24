const Productos_servicios = require('../models/productos_servicios/Producto_servicio');


const productoDetailRoutes = [
    {
        method: 'GET',
        path: '/product-detail/{id}',
        handler: async (request, h) => {
            try {
               const product = await Productos_servicios.findById(request.params.id)
               // aca lo mismo. ver modelo para poder correr populate.
               // .populate('proveedor');
               // .populat('categoria');
               return h.response(product);
            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
]


module.exports = productoDetailRoutes