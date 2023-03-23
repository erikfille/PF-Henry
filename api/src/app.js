const hapi = require("@hapi/hapi");
require("./database.js");
const usuariosRoutes = require("./routes/usuarios.js")
const rolRoutes = require("./routes/roles")
//const productosRoutes = require("./routes/productos")
//const categoriasRoutes = require("./routes/categorias")

const init = async () => {
    const server = new hapi.Server({
        port: 3000,
        host:"localHost",
    })

    server.route(usuariosRoutes)
    server.route(rolRoutes)
// server.route(productosRoutes)
// server.route(categoriasRoutes)



 await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
}

init()