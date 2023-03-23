const Productos_servicios = require('../models/productos_servicios');


const productoDetailRoutes = [
    {
        method: 'GET',
        path: '/product-detail/{id}',
        handler: async (request, h) => {
            try {
               const product = await Productos_servicios.findById(request.params.id).populate('Categoria');
               return h.response(product);
            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
]


module.exports=productoDetailRoutes