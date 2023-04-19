const jwt = require('jsonwebtoken');


const validacionTokenRoutes = [{
    method: 'GET',
    path: '/validado',
    handler: async (request, h) => {
        try {
            // Obtener el token de la cabecera de autorización
            const authHeader = request.headers.authorization;
            const token = authHeader.split(" ")[1];

            // Verificar el token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

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
    }
}]

module.exports = validacionTokenRoutes