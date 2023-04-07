const Rol = require("../models/roles/Rol")

const rolRoutes = [{
    method: "POST",
    path: "/roles",
    handler: async (request, h) => {
       try {
        const rol = new Rol(request.payload)
        const rolSaved = await rol.save()
        return h.response(rolSaved)
       } catch (error) {
        return h.response(error).code(501)
       }
    }
}]

module.exports = rolRoutes