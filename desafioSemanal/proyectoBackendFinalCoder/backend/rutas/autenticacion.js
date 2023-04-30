const ControladorAutenticacion = require('../controladores/autenticacion');
const authRouter = require('./router');

class RutasAutenticacion{
    constructor(){
        this.controlador = new ControladorAutenticacion()
    }

    start(){
        authRouter.get('/registrarse', this.controlador.getRegistro)
        authRouter.post('/registrarse', this.controlador.postRegistro)
    
        authRouter.get('/login', this.controlador.getLogin)
        authRouter.post('/login', this.controlador.postLogin)
    
        authRouter.get('/logout', this.controlador.getLogout)

        return authRouter
    }
}

module.exports = RutasAutenticacion
