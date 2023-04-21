const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios/Usuario")

const validacionTokenRoutes = [
  {
    method: "POST",
    path: "/validado",
    handler: async (request, h) => {
        try {
            // Obtener el token de la cabecera de autorización
            const token = request.payload.token;

            // Verificar el token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decodedToken);

        // verifica que el id del decodedToken.id se corresponda con algun usuario, y chequea:
        // - Si el usuario existe
        // - Si el usuario esta habilitado (status: 1)

        // En caso de que no exista o no este habilitado se responde con un error con codigo distinto a los otros, para poder avisar al usuario que no tiene un usuario activo y se lo manda al signup

        const user = await Usuario.findById({ _id: decodedToken.id });
        if (!user) {
          return h.response({ error: "Usuario no existe" }).code(400);
        }
        if (user.status !== 1) {
          return h.response({ error: "Usuario no está habilitado" }).code(400);
        }

        // Agregar la información del usuario decodificada al objeto "request"
        request.user = decodedToken;

        // Si el token es válido, continuar con la ruta
        return h.response({ message: "Token válido" });
      } catch (error) {
        // Si el token es inválido o ha expirado, devolver un error
        if (error.name === "JsonWebTokenError") {
          return h.response({ error: "Token inválido" }).code(401);
        } else if (error.name === "TokenExpiredError") {
          return h.response({ error: "Token expirado" }).code(401);
        } else {
          return h.response({ error: "Error al verificar el token" }).code(500);
        }
      }
    },
  },
];

module.exports = validacionTokenRoutes;
