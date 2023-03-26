const ProductoServicio = require("../../models/productos_servicios/Producto_servicio");

const searchProductosRoutes = [{
    method: 'GET',
    path: '/matcheados', ///matcheados?titulo=nombre-del-producto
    handler: async (request, h) => {
      try {
        const { titulo } = request.query;
  
        if (typeof titulo !== "string") {
          throw new Error("El parámetro 'titulo' debe ser una cadena");
        }
  
        const productos = await ProductoServicio.find({ titulo: { $regex: titulo, $options: 'i' } })
        .populate('categoria')
        .populate('proveedor',"nombre");
        return h.response(productos);
      } catch (error) {
        console.error(error);
        return h.response('Error interno del servidor').code(500);
      }
    }
  }]
  
  module.exports = searchProductosRoutes;