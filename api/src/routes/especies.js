const Especie = require("../models/especies/Especie")

const especieRoutes = [
  {
    method: "POST",
    path: "/especies",
    handler: async (request, h) => {
      try {
        const newEspecie = new Especie(request.payload);
        const savedEspecie = await newEspecie.save();
        return h.response(savedEspecie);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/especies",
    handler: async (request, h) => {
      try {
        const especie = await Especie.find();
        return h.response(especie);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "PUT",
    path: "/especies/status/{id}",
    handler: async (request, h) => {
      try {
        const id = request.params.id;
        const update = request.payload;
        const especie = await Especie.findByIdAndUpdate(id, update, {
          new: true,
        });
        return especie;
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];

module.exports = especieRoutes
