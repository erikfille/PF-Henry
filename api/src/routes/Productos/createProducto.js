const ProductoServicio = require("../../models/productos_servicios/Producto_servicio");
const Categoria = require("../../models/categorias/Categoria");

const createProductosRoutes = [
  {
    method: "POST",
    path: "/crearProducto",
    handler: async (request, h) => {
      try {
        const {
          titulo,
          tipo,
          precio,
          imagen,
          descripcion,
          rating,
          stock,
          activo,
          categoria,
          proveedor
        } = request.payload;

        // Buscar la categoría por su nombre
        const categoriaEncontrada = await Categoria.findOne({ tipo: categoria[0], [categoria[0].toLowerCase() + 's']: categoria[1]});

        if (!categoriaEncontrada) {
          return h.response(`La categoría ${categoria[0]} - ${categoria[1]} no existe`).code(400);
        }

        const nuevoProductoServicio = new ProductoServicio({
          titulo,
          tipo,
          precio,
          imagen,
          descripcion,
          rating,
          stock,
          activo,
          categoria: categoriaEncontrada._id,
          proveedor
        });

        const productoServicioGuardado = await nuevoProductoServicio.save();
        return h.response(productoServicioGuardado).code(201);
      } catch (error) {
        return h.response(error.message).code(500);
      }
    },
  },
];

module.exports = createProductosRoutes;



// const ProductoServicio = require("../../models/productos_servicios/Producto_servicio")

// const createProductosRoutes = [
//   {
//     method: "POST",
//     path: "/crearProducto",
//     handler: async (request, h) => {
//       try {
//         const { titulo, tipo, precio, imagen, descripcion, rating, stock, activo, categoria, proveedor } = request.payload;
//         const nuevoProductoServicio = new ProductoServicio({
//           titulo,
//           tipo,
//           precio,
//           imagen,
//           descripcion,
//           rating,
//           stock,
//           activo,
//           categoria,
//           proveedor,
//         });
//         const productoServicioGuardado = await nuevoProductoServicio.save();
//         return h.response(productoServicioGuardado).code(201);
//       } catch (error) {
//         return h.response(error.message).code(500);
//       }
//     },
//   },
// ];

// module.exports = createProductosRoutes;