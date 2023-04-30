const connection = require('../config/mongooseConfig')
const CarritosDAO = require('../persistencia/mongo/carritosDAO')

class ApiCarrito{
    constructor(){
        this.carritosDAO = new CarritosDAO(connection)
    }
    
    async agregarProductoAlCarrito(idCarrito, idProducto, precioProducto){
        return await this.carritosDAO.agregarProductoAlCarrito(idCarrito, idProducto, precioProducto)
    }
    
    async getCart(idCarrito){
        return await this.carritosDAO.getCarrito(idCarrito)
    }
    
    async eliminarProductoDelCarrito(idCarrito, idProducto){
        return await this.carritosDAO.eliminarProductoDelCarrito(idCarrito, idProducto)
    }
    
    async vaciarCarrito(id){
        return await this.carritosDAO.vaciarCarrito(id)
    }
    
    async confirmarCompra(id){
        return await this.carritosDAO.getCarrito(id)
    }

}

module.exports = ApiCarrito