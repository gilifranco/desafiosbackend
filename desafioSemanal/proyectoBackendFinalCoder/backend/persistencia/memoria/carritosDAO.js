const logger = require('../../utils/logger');

class CarritosDAO{
    constructor(){
        this.carrito = []
    }
    
    async nuevoCarrito(user){
        try {
            
        } catch (error) {
            logger.info(error)
        }
    }
    
    async getCarrito(id){
        try {
            
        } catch (error) {
            logger.info(error)
        }
    }

    async agregarProductoAlCarrito(id, prodId){
        try {
            
        } catch (error) {
            logger.info(error);
        }
    }

    async eliminarProductoDelCarrito(id, prodId){
        try {
            
        } catch (error) {
            logger.info(error);
        }
    }
}

module.exports = CarritosDAO