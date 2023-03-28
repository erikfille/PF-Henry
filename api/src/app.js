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
const compraDetailRoutes = require("./routes/ordenDeCompra.js");
const modifyingProductosRoutes = require("./routes/Productos/modifyingProducto.js")
const searchProductosRoutes = require("./routes/Productos/searchProducto.js")
const modifyingProveedorRoutes = require("./routes/Proveedores/putProveedor")
const createComentarioResenaRoute = require("./routes/comentariosResenas")

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
  server.route(compraDetailRoutes);
  server.route(modifyingProductosRoutes);
  server.route(searchProductosRoutes);
  server.route(modifyingProveedorRoutes);
  server.route(createComentarioResenaRoute);

  await server.start();
  console.log(`el servidor esta corriendo en ${server.info.uri}`);
};

init();
