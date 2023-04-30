const connection = require('../config/mongooseConfig')
const FavoritosDAO = require("../persistencia/mongo/favoritosDAO");

class ApiFavoritos{
    constructor(){
        this.favoritosDAO = new FavoritosDAO(connection)
    }

    async getFavoritos(id){
        return await this.favoritosDAO.getFavoritos(id);
    }

    async agregarProductoAFavoritos(id, prodId){
        return await this.favoritosDAO.agregarProductoAFavoritos(id, prodId)
    }

    async eliminarProductoDeFavoritos(id, prodId){
        return await this.favoritosDAO.eliminarProductoDeFavoritos(id, prodId)
    }
}

module.exports = ApiFavoritos