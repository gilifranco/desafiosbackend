const opinionRouter = require('./router');
const estaAutenticado = require('../middlewares/autenticacion');
const ControladorOpinones = require('../controladores/opiniones');

class RutasOpiniones{
    constructor(){
        this.controlador = new ControladorOpinones() 
    }

    start(){
        opinionRouter.post('/publicaropinion/:id', estaAutenticado, this.controlador.postOpinion)
        opinionRouter.post('/opiniones/filtrar/:id', estaAutenticado, this.controlador.postFiltrarOpiniones)

        return opinionRouter
    }
}

module.exports = RutasOpiniones