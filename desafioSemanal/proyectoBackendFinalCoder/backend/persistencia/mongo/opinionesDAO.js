const Opinion  = require('../../schemas/opinion');
const logger = require('../../utils/logger');

class OpinionesDAO{
    constructor(connection){
        this.connection = connection
    }

    async crearOpinion(opinion){
        try{
            return await Opinion.create(opinion)    
        }catch(err){
            logger.info(err)
        }
    } 

    async getOpiniones(prodId){
        try{
            return await Opinion.find({producto: prodId}).populate('usuario').lean()
        }catch(err){
            logger.info(err)
        }
    }

    async getOpinionesByFiltro(ordenar, prodId){
        try{
            if(ordenar === 'mejorCalificacion'){
                return await Opinion.find({producto: prodId}).populate('usuario').sort({calificacion: -1})
            }else if(ordenar === 'peorCalificacion'){
                return await Opinion.find({producto: prodId}).populate('usuario').sort({calificacion: 1})
            }else if(ordenar === 'masReciente'){
                return await Opinion.find({producto: prodId}).populate('usuario').sort({createdAt: -1})
            }else if(ordenar === 'masAntiguo'){
                return await Opinion.find({producto: prodId}).populate('usuario').sort({createdAt: 1})
            }
        }catch(err){
            logger.info(err)
        }       
    }          

}

module.exports = OpinionesDAO