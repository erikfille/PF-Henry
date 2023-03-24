// const createMascotaRoutes = [
//     {
    const Mascota = require("../models/mascotas/Mascota");

    const createMascotaRoutes = [
      {
        method: "POST",
        path: "/crearMascota",
        handler: async (request, h) => {
          try {
            const mascota = new Mascota(request.payload);
            await mascota.save();
            return h.response(mascota).code(201);
          } catch (error) {
            return h.response(error).code(500);
          }
        },
      },
    ];
    
    module.exports = createMascotaRoutes; 
//     }
// ]

// module.exports = createMascotaRoutes