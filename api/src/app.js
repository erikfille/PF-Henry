const hapi = require("@hapi/hapi");
require("./database.js");


const init = async () => {
    const server = new hapi.server({
        port: 3000,
        host:"localHost",
    })





 await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
}

init()