const connection = require('../config/mongooseConfig')
const AuthDAO = require("../persistencia/mongo/autenticacionDAO");

class ApiUsuarios{
    constructor(){
        this.autenticacionDAO = new AuthDAO(connection)
    }

    async getDatos(usuario){
        return await this.autenticacionDAO.getUsuario(usuario)
    }

    async getFavoritos(id){
        return await this.autenticacionDAO.favoritos(id)
    }

    async agregarProductoAFavoritos(id, prodId){
        return await this.autenticacionDAO.agregarProductoAFavoritos(id, prodId)
    }
}

module.exports = ApiUsuarios