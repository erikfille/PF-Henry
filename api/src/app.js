const hapi = require("@hapi/hapi");
require("./database.js");
const usuariosRoutes = require("./routes/usuarios.js")
const rolRoutes=require("./routes/roles")


const init = async () => {
    const server = new hapi.Server({
        port: 3000,
        host:"localHost",
    })

    server.route(usuariosRoutes)
    server.route(rolRoutes)



 await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
}

init()