const hapi = require("@hapi/hapi");
const HapiCors = require("hapi-cors");
require("./database.js");
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
const ordenDecompraRoutes = require("./routes/ordenDeCompra.js");
const modifyingProductosRoutes = require("./routes/Productos/modifyingProducto.js")

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
  server.route(ordenDecompraRoutes);
  server.route(modifyingProductosRoutes);

  await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
};

init();
