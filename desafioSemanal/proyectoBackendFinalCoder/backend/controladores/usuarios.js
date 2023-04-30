const asyncHandler = require('express-async-handler');
const ApiUsuarios = require('../servicio/usuario');
const logger = require('../utils/logger');

class ControladorUsuarios{
    constructor(){
        this.apiUsuarios = new ApiUsuarios()
    }

    getDatos = asyncHandler(async (req, res) => {
        try {
            const username = req.user.username;
            const usuario = await this.apiUsuarios.getDatos(username)
            res.render('datos', {usuario})
        } catch (error) {
            logger.info(error)
        }
    })

    getFavoritos = asyncHandler(async (req, res) => {
        try {
            const favoritos = await this.apiUsuarios.getFavoritos(req.user._id);
            console.log(favoritos);
            res.render('favoritos')
        } catch (error) {
            logger.info(err)
        }
    })

    agregarProductoAFavoritos = asyncHandler(async (req, res) => {
        try {
            await this.apiUsuarios.agregarProductoAFavoritos(req.user._id, req.params.id)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(err)
        }
    })
}

module.exports = ControladorUsuarios