const hapi = require("@hapi/hapi");
require("./database.js");
const usuariosRoutes = require("./routes/usuarios.js");
const rolRoutes = require("./routes/roles");
const createProductosRoutes = require("./routes/createProducto")
//const categoriasRoutes = require("./routes/categorias")
const productoDetailRoutes = require("./routes/productoDetail.js")
const allProductosRoutes = require("./routes/allProductos.js")
//const stockProductosRoutes = require("./routes/stockProductos.js")


const init = async () => {
  const server = new hapi.Server({
    port: 3000,
    host: "localHost",
  });

  server.route(usuariosRoutes);
  server.route(rolRoutes);
  server.route(createProductosRoutes)
  // server.route(categoriasRoutes)
  server.route(productoDetailRoutes)
  server.route(allProductosRoutes)
  // server.route(stockProductosRoutes)

  await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
};

init();
