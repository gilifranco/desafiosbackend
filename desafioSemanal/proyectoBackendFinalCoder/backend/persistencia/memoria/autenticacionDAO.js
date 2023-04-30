const logger = require('../../utils/logger');

class AuthDAO{
    constructor(){
        this.usuarios = []
    }

    async crearUsuario(newUser){
        try{
            this.usuarios.push(newUser)
        }catch(err){
            logger.info(err)
        }
    }

    async getUsuario(username){
        try{
            const usuario = this.usuarios.find(usuario => usuario.username === username);
            return usuario
        }catch(err){
            logger.info(err);
        }
    }

    async getUsuarioMail(email){
        try{
            const usuario = this.usuarios.find(usuario => usuario.email === email);
            return usuario
        }catch(err){
            logger.info(err);
        }
    }

    async getUsuarioId(id){
        try{
            const usuario = this.usuarios.find(usuario => usuario.id === id);
            return usuario
        }catch(err){
            logger.info(err);
        }
    }

}

module.exports = AuthDAO