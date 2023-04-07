const ComentarioResena = require("../models/comentarios_resenas/Comentario_resena");
const ProductoServicio = require("../models/productos_servicios/Producto_servicio")

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

        return h.response(comentarioResena).code(201);
      } catch (error) {
        console.error(error); // Imprimir el error en la consola para depuración
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
          .populate("usuario", "name")
          .populate("producto", "titulo");
        return h.response(comentariosResenas).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = createComentarioResenaRoute;
