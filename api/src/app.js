const hapi = require("@hapi/hapi");
const HapiCors = require("hapi-cors");
require("./database.js");
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config();
const HapiJwt = require('hapi-auth-jwt2');

const usuariosRoutes = require("./routes/usuarios.js");
const rolRoutes = require("./routes/roles");
const createProductosRoutes = require("./routes/Productos/createProducto");
const categoriasRoutes = require("./routes/categorias");
const productoDetailRoutes = require("./routes/Productos/productoDetail.js");
const allProductosRoutes = require("./routes/Productos/allProductos.js");
const stockProductosRoutes = require("./routes/Productos/stockProductos.js");
const postProvedorRoutes = require("./routes/Proveedores/postProveedor");
const getProveedorRoutes = require("./routes/Proveedores/getProveedor.js")
const createMascotaRoutes = require("./routes/createMascota.js");
const compraDetailRoutes = require("./routes/ordenDeCompra.js");
const modifyingProductosRoutes = require("./routes/Productos/modifyingProducto.js")
const searchProductosRoutes = require("./routes/Productos/searchProducto.js")
const modifyingProveedorRoutes = require("./routes/Proveedores/putProveedor")
const createComentarioResenaRoute = require("./routes/comentariosResenas")
const especieRoutes = require("./routes/especies")
const nodeMailerRoutes = require("./routes/nodeMailerRoute")

const init = async () => {
  const server = new hapi.Server({
    port: 3000,
    host: "localHost",
  });

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ["*"],
    },
  });

  // await server.register(HapiJwt);

  // server.auth.strategy('jwt', 'jwt', {
  //   key: process.env.JWT_SECRET,
  //   validate: async (decoded, request, h) => {
  //     // Aquí puedes realizar la validación del token decodificado
  //     // Para un ejemplo básico, simplemente se devuelve true
  //     return { isValid: true };
  //   },
  //   verifyOptions: { algorithms: ['HS256'] },
  // });

  // server.auth.default('jwt');

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );
  
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  server.auth.scheme('google', () => {
    const scheme = {
      authenticate: async (request, h) => {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
          return h.unauthenticated();
        }

        const [authType, token] = authorizationHeader.split(' ');

        if (authType.toLowerCase() !== 'bearer') {
          return h.unauthenticated();
        }

        try {
          const ticket = await oAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
          });
          const payload = ticket.getPayload();

          return h.authenticated({
            credentials: {
              email: payload.email,
            }
          });
        } catch (err) {
          console.error(err);
          return h.unauthenticated();
        }
      }
    };

    return scheme;
  });

  server.auth.strategy('google', 'google');

  server.route(usuariosRoutes);
  server.route(rolRoutes);
  server.route(createProductosRoutes);
  server.route(categoriasRoutes);
  server.route(productoDetailRoutes);
  server.route(allProductosRoutes);
  server.route(stockProductosRoutes);
  server.route(postProvedorRoutes);
  server.route(getProveedorRoutes);
  server.route(createMascotaRoutes);
  server.route(compraDetailRoutes);
  server.route(modifyingProductosRoutes);
  server.route(searchProductosRoutes);
  server.route(modifyingProveedorRoutes);
  server.route(createComentarioResenaRoute);
  server.route(especieRoutes)
  server.route(nodeMailerRoutes)

  await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
};

init();