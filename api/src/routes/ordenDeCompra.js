const OrdenDeCompra = require("../models/ordenesDeCompras/OrdenDeCompra");
const Usuario = require("../models/usuarios/Usuario")
const ProductoVendido = require("../models/productosVendido/productoVendido")

const compraDetailRoutes = [
  {
    method: "GET",
    path: "/ordenDeCompra/{id}",
    handler: async (request, h) => {
      try {
        const compra = await OrdenDeCompra.findById(request.params.id)
          .populate({
            path: "comprador",
            select: "name surname email address",
          })
          .populate("productos", "titulo")
          .populate("envio");
        return h.response(compra);
      } catch (err) {
        return h.response(err).code(500);
      }
    },
  },

  {
    method: 'POST',
    path: '/ordenDeCompra',
    handler: async (request, h) => {
      try {
        const { id_usuario, productos } = request.payload;
  
        if (!productos || !Array.isArray(productos)) {
          throw new Error('El payload debe incluir una propiedad "productos" que sea un array');
        }
  
        const productosVendidos = productos.map(async (producto) => {
          const { id_producto, id_proveedor, precio } = producto;
          const newProductoVendido = new ProductoVendido({
            id_producto,
            id_usuario,
            id_proveedor,
            precio,
            fecha: new Date().toISOString(),
          });
  
          return await newProductoVendido.save();
        });
  
        await Promise.all(productosVendidos);
  
        await Usuario.findByIdAndUpdate(id_usuario, {
          $push: {
            productosComprados: productos.map((producto) => producto.id_producto),
          },
        });
  
        return h.response('Orden de compra creada exitosamente').code(201);
      } catch (err) {
        console.error(err);
        return h.response('Ha ocurrido un error al crear la orden de compra').code(500);
      }
    },
  }  
];

module.exports = compraDetailRoutes;
