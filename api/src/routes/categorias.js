const Categoria = require("../models/categorias/Categoria");
const HapiCors = require("hapi-cors");

const categoriasRoutes = [
  {
    method: "GET",
    path: "/categorias",
    handler: async (request, h) => {
      try {
        const categorias = await Categoria.find();
        return { categorias };
      } catch (error) {
        console.error(error);
        return h
          .response({ message: "Error al obtener las categorias" })
          .code(500);
      }
    },
    options: {
      cors: true, // Habilita las CORS para este endpoint
    },
  },
  {
    method: "POST",
    path: "/crearCategoria",
    handler: async (request, h) => {
      try {
        const newCategoria = new Categoria(request.payload);
        const savedCategoria = await newCategoria.save();
        return h.response(savedCategoria).code(201);
      } catch (error) {
        return h.response(error.message).code(500);
      }
    },
    options: {
      cors: true, // Habilita las CORS para este endpoint
    },
  },
  {
    method: "PUT",
    path: "/categoria/{id}",
    handler: async (request, h) => {
      try {
        const id = request.params.id;
        const update = request.payload;
        const categoria = await Categoria.findByIdAndUpdate(id, update, {
          new: true,
        });
        return categoria;
      } catch (error) {
        return h.response(error).code(500);
      }
    },
    options: {
      cors: true, // Habilita las CORS para este endpoint
    },
  },
];

module.exports = categoriasRoutes;
