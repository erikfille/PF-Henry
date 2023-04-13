const hapi = require("@hapi/hapi");
const HapiCors = require("hapi-cors");
require("./database.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
const Usuario = require("./models/usuarios/Usuario");

const usuariosRoutes = require("./routes/usuarios.js");
const rolRoutes = require("./routes/roles");
const createProductosRoutes = require("./routes/Productos/createProducto");
const categoriasRoutes = require("./routes/categorias");
const productoDetailRoutes = require("./routes/Productos/productoDetail.js");
const allProductosRoutes = require("./routes/Productos/allProductos.js");
const stockProductosRoutes = require("./routes/Productos/stockProductos.js");
const postProvedorRoutes = require("./routes/Proveedores/postProveedor");
const getProveedorRoutes = require("./routes/Proveedores/getProveedor.js");
const createMascotaRoutes = require("./routes/createMascota.js");
const compraDetailRoutes = require("./routes/ordenDeCompra.js");
const modifyingProductosRoutes = require("./routes/Productos/modifyingProducto.js");
const searchProductosRoutes = require("./routes/Productos/searchProducto.js");
const modifyingProveedorRoutes = require("./routes/Proveedores/putProveedor");
const createComentarioResenaRoute = require("./routes/comentariosResenas");
const especieRoutes = require("./routes/especies");
const nodeMailerRoutes = require("./routes/nodeMailerRoute");
const mercadoPagoRoutes = require("./routes/mercadoPago");
const comprasRoutes = require("./routes/comprasUsuario.js");
const historialRoutes = require("./routes/historialAnimal.js");
const productoCompradoRoutes = require("./routes/Productos/productoComprado")
const port = process.env.PORT;

const init = async () => {
  const server = new hapi.Server({
    port: port,
    host: "0.0.0.0",
  });

  await server.register({
    plugin: HapiCors,
    options: {
      methods: ["PUT", "POST", "DELETE", "GET"],
      origins: ["*"],
    },
  });

  // Creamos una función para validar el token JWT
  const validateToken = async (decoded, request) => {
    try {
      // 1. Obtener el id del usuario desde el token decodificado.
      const { id } = decoded;

      // 2. Buscar el usuario en la base de datos usando el id.
      const usuario = await Usuario.findById(id).populate("rol");

      // 3. Verificar si el usuario existe y si tiene los permisos necesarios para acceder a la ruta.
      if (!usuario) {
        throw Boom.unauthorized("Invalid User");
      }

      const permisosNecesarios = ["provider", "admin"]; // Aquí especifica los permisos necesarios para acceder a la ruta

      if (!usuario.rol || !permisosNecesarios.includes(usuario.rol.nombre)) {
        throw Boom.forbidden("Insufficient Permissions");
      }

      // 4. Si el usuario tiene los permisos necesarios, se debe llamar a la función credentials() de la respuesta y pasarle el usuario como parámetro.
      return {
        isValid: true,
        credentials: usuario,
      };
    } catch (err) {
      console.error(err);
      return {
        isValid: false,
        credentials: null,
      };
    }
  };

  // Registramos el esquema de autenticación JWT
  server.auth.scheme("jwt", () => ({
    async authenticate(request, h) {
      try {
        // Obtenemos el token JWT del encabezado Authorization
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
          throw Boom.unauthorized("Missing token");
        }

        const token = authorizationHeader.replace(/^Bearer\s+/, "");

        // Validamos el token JWT
        const decoded = await jwt.verify(token, process.env.JWT_SECRET, {
          algorithms: ["HS256"],
        });

        // Llamamos a la función de validación de token
        const credentials = await validateToken(decoded, request);

        return h.authenticated({ credentials, artifacts: token });
      } catch (error) {
        throw Boom.unauthorized("Invalid token");
      }
    },
  }));

  // Registramos la estrategia de autenticación JWT
  server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 60 * 60 * 72, // 72 horas
    },
  });

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
  server.route(especieRoutes);
  server.route(nodeMailerRoutes);
  server.route(mercadoPagoRoutes);
  server.route(comprasRoutes);
  server.route(historialRoutes);
  server.route(productoCompradoRoutes)

  await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
};

init();
