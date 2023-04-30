const User = require("../../schemas/usuario");
const logger = require('../../utils/logger');

class AuthDAO{
    constructor(connection){
        this.connection = connection
    }

    async crearUsuario(newUser){
        try{
            return await User.create(newUser)
        }catch(err){
            logger.info(err)
        }
    }

    async getUsuario(username){
        try{
            return await User.findOne({username}).lean()
        }catch(err){
            logger.info(err);
        }
    }

    async getUsuarioMail(email){
        try{
            return await User.findOne({email})
        }catch(err){
            logger.info(err);
        }
    }

    async getUsuarioId(id){
        try{
            return await User.findById(id)
        }catch(err){
            logger.info(err);
        }
    }
}

module.exports = AuthDAO