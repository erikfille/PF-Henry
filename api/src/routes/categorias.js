const Categoria = require('../models/categorias/Categoria')
const productos_servicios = require('../models/productos_servicios/Producto_servicio')


const categoriasRoutes = [
    {
    method: 'GET',
    path: '/allCategories',
    handler: async (request, h) => {
        try {
            const categoriasProductos = await Categoria.find({ categoria: ['Productos'] }).populate(productos_servicios);
            const categoriasServicios = await Categoria.find({ categoria: ['Servicios'] }).populate(productos_servicios);

            const AllCategorias = categoriasProductos.concat(categoriasServicios);
    
           return h.response(AllCategorias);
        } catch (err) {
            return h.response(err).code(500);
        }
    }
    }
]
module.exports=categoriasRoutes