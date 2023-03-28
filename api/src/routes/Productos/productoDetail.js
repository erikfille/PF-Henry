const ProductoServicio = require('../../models/productos_servicios/Producto_servicio');


const productoDetailRoutes = [
    {
        method: 'GET',
        path: '/product-detail/{id}',
        handler: async (request, h) => {
            try {
               const product = await ProductoServicio.findById(request.params.id)
               // aca lo mismo. ver modelo para poder correr populate.
               .populate({
                path: 'comentario',
                select: 'comentario puntuacion fecha',
                populate: {
                    path: 'usuario',
                    select: 'name surname'
                }
            })
            .populate('proveedor', 'nombre')
            .populate('categoria');
                
               return h.response(product);
            } catch (err) {
                return h.response(err).code(500);
            }
        }
    },
]


module.exports = productoDetailRoutes