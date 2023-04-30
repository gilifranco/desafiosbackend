const favoritosRouter = require('./router')
const estaAutenticado = require('../middlewares/autenticacion');
const ControladorFavoritos = require('../controladores/favoritos');

class RutasFavoritos{
    constructor(){
        this.controlador = new ControladorFavoritos()
    }

    start(){
        favoritosRouter.get('/favoritos', estaAutenticado, this.controlador.getFavoritos)
        favoritosRouter.post('/agregarafavoritos/:id', estaAutenticado, this.controlador.agregarProductoAFavoritos)
        favoritosRouter.post('/eliminardefavoritos/:id', estaAutenticado, this.controlador.eliminarProductoDeFavoritos)

        return favoritosRouter
    }
}

module.exports = RutasFavoritos