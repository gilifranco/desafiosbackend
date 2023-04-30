const Favoritos = require("../../schemas/favoritos");
const logger = require('../../utils/logger');

class FavoritosDAO{
    constructor(connection){
        this.connection = connection
    }

    async crearFavoritos(user){
        try {
            return await Favoritos.create({usuario: user});
        } catch (error) {
            logger.info(err);
        }
    }

    async getFavoritos(id){
        try{
            return await Favoritos.find({usuario: {_id: id}}).populate('usuario').populate('favoritos').lean()
        }catch(err){
            logger.info(err);
        }
    }
    
    async agregarProductoAFavoritos(id, prodId){
        try {
            return await Favoritos.updateOne(
                {usuario: id}, 
                {$push :{favoritos: prodId}}
                )
        } catch (error) {
            logger.info(error);
        }
    }

    async eliminarProductoDeFavoritos(id, prodId){
        try {
            return await Favoritos.updateOne(
                {usuario: id}, 
                {$pull :{favoritos: prodId}}
                )
        } catch (error) {
            logger.info(error);
        }
    }
}

module.exports = FavoritosDAO
