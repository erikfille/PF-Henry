const ComentarioResena = require("../models/comentarios_resenas/Comentario_resena");
const ProductoServicio = require("../models/productos_servicios/Producto_servicio");

async function actualizarRatingProducto(productoId) {
  const comentarios = await ComentarioResena.find({ producto: productoId });

  let totalPuntuaciones = 0;
  for (const comentario of comentarios) {
    totalPuntuaciones += comentario.puntuacion;
  }

  const promedioPuntuaciones =
    comentarios.length > 0 ? totalPuntuaciones / comentarios.length : 0;

  await ProductoServicio.findByIdAndUpdate(
    productoId,
    { rating: promedioPuntuaciones },
    { new: true }
  );
}

module.exports = actualizarRatingProducto;