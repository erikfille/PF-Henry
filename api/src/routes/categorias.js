const Categoria = require("../models/categorias/Categoria");

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
  },
];

module.exports = categoriasRoutes;
