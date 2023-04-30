const userRouter = require('./router')
const estaAutenticado = require('../middlewares/autenticacion');
const ControladorUsuarios = require('../controladores/usuarios');

class RutasUsuario{
    constructor(){
        this.controlador = new ControladorUsuarios()
    }

    start(){
        userRouter.get('/datos', estaAutenticado, this.controlador.getDatos)

        return userRouter
    }
}

module.exports = RutasUsuario