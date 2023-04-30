const connection = require('../config/mongooseConfig');
const AuthDAO = require('../persistencia/mongo/autenticacionDAO');
const authContainer = new AuthDAO(connection);

const esAdmin = async(req, res, next) => {
    const usuario = await authContainer.getUsuario(req.user.username)
    if(usuario.rol === 'admin'){
        next()
    }else{
        res.json({error: 'acceso denegado'})
    }
}

module.exports = esAdmin

