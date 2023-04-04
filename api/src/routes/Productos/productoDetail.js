const ProductoServicio = require('../../models/productos_servicios/Producto_servicio');

const productDetailRoutes = [
  {
    method: 'GET',
    path: '/product-detail/{id}',
    handler: async (request, h) => {
      try {
        const product = await ProductoServicio.findById(request.params.id)
          .populate({
            path: 'comentario',
            select: 'comentario puntuacion fecha',
            populate: {
              path: 'usuario',
              select: 'name surname'
            }
          })
          .populate({
            path: 'proveedor',
            select: 'nombre',
            populate: {
              path: 'productos',
              select: 'nombre precio descripcion',
            }
          })
          .populate('categoria');
          
        return h.response(product);
      } catch (err) {
        return h.response(err).code(500);
      }
    }
  }
];

module.exports = productDetailRoutes;
