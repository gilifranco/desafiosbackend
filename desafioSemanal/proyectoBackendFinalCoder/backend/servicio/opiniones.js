const connection = require('../config/mongooseConfig')
const OpinionesDAO = require('../persistencia/mongo/opinionesDAO')

class ApiOpiniones{
    constructor(){
        this.opinionesDAO = new OpinionesDAO(connection)
    }
    
    async crearOpinion(opinion){
        return await this.opinionesDAO.crearOpinion(opinion)
    }
    
    async getOpiniones(prodId){
        return await this.opinionesDAO.getOpiniones(prodId)
    }

    async getOpinionesByFiltro(ordenar, prodId){
        return await this.opinionesDAO.getOpinionesByFiltro(ordenar, prodId)
    }
}

module.exports = ApiOpiniones