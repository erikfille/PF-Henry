const ComentarioResena = require("../models/comentarios_resenas/Comentario_resena");
const ProductoServicio = require("../models/productos_servicios/Producto_servicio");

const createComentarioResenaRoute = [
  {
    method: "POST",
    path: "/crearComentarioResena",
    handler: async (request, h) => {
      try {
        const comentarioResena = new ComentarioResena({
          comentario: request.payload.comentario,
          puntuacion: request.payload.puntuacion,
          producto: request.payload.producto,
          usuario: request.payload.usuario,
        });
        await comentarioResena.save();

        // Aca se va a actualizar el campo "comentario" del producto al que se le hace la reseña.
        await ProductoServicio.findByIdAndUpdate(
          request.payload.producto,
          { $push: { comentarios: comentarioResena._id } },
          { new: true }
        );

        // Recalcular el rating del producto y actualizar su valor
        const producto = await ProductoServicio.findById(
          request.payload.producto
        ).populate("comentarios");
        const comentarios = producto.comentarios;
        const sumaPuntuaciones = comentarios.reduce(
          (acc, comentario) => acc + comentario.puntuacion,
          0
        );
        const rating = sumaPuntuaciones / comentarios.length;
        producto.rating = rating;
        await producto.save();

        return h.response(comentarioResena).code(201);
      } catch (error) {
        console.error(error);
        return h
          .response({
            statusCode: 500,
            error: "Internal Server Error",
            message: "Ocurrió un error al crear el comentario de la reseña",
          })
          .code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/comentariosResenas/{productoId}",
    handler: async (request, h) => {
      try {
        const comentariosResenas = await ComentarioResena.find({
          producto: request.params.productoId,
        })
          .populate("usuario", "name surname")
          .populate("producto", "titulo");

        return h
          .response({
            comentariosResenas: comentariosResenas,
          })
          .code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "DELETE",
    path: "/borrarComentarioResena/{idComentario}",
    handler: async (request, h) => {
      try {
        const comentarioResena = await ComentarioResena.findByIdAndDelete(
          request.params.idComentario
        );
        if (!comentarioResena) {
          return h
            .response({ message: "El comentario o reseña no existe" })
            .code(404);
        }

        await ProductoServicio.findByIdAndUpdate(
          comentarioResena.producto,
          { $pull: { comentarios: comentarioResena._id } },
          { new: true }
        );

        const producto = await ProductoServicio.findById(
          comentarioResena.producto
        ).populate("comentarios");
        const comentarios = producto.comentarios;
        const sumaPuntuaciones = comentarios.reduce(
          (acc, comentario) => acc + comentario.puntuacion,
          0
        );
        const rating =
          comentarios.length > 0 ? sumaPuntuaciones / comentarios.length : 0;
        producto.rating = rating;
        await producto.save();

        return h
          .response({ message: "Comentario o reseña eliminado correctamente" })
          .code(200);
      } catch (error) {
        console.error(error);
        return h
          .response({
            statusCode: 500,
            error: "Internal Server Error",
            message: "Ocurrió un error al eliminar el comentario o reseña",
          })
          .code(500);
      }
    },
  },
];

module.exports = createComentarioResenaRoute;
