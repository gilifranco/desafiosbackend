const asyncHandler = require('express-async-handler');
const ApiFavoritos = require('../servicio/favoritos');
const logger = require('../utils/logger');

class ControladorFavoritos{
    constructor(){
        this.apiFavoritos = new ApiFavoritos()
    }

    getFavoritos = asyncHandler(async (req, res) => {
        try{
            const favoritos = await this.apiFavoritos.getFavoritos(req.user._id);
            const favoritosArray = favoritos[0].favoritos;
            res.render('favoritos', {favoritosArray})
        }catch(error){
            logger.info(error)
        }
    });

    agregarProductoAFavoritos = asyncHandler(async (req, res) => {
        try{
            await this.apiFavoritos.agregarProductoAFavoritos(req.user._id, req.params.id)
            res.redirect('/api/productos')
        }catch(error){
            logger.info(error)
        }
    })

    eliminarProductoDeFavoritos = asyncHandler(async (req, res) => {
        try{
            await this.apiFavoritos.eliminarProductoDeFavoritos(req.user._id, req.params.id)
            res.redirect('/api/favoritos')
        }catch(error){
            logger.info(error)
        }
    });
    
}


module.exports = ControladorFavoritos