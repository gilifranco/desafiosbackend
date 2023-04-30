const productosDAOMongo = require('../persistencia/mongo/productosDAO');
const productosDAOMemoria = require('../persistencia/memoria/productosDAO');
const connection = require('../config/mongooseConfig')

class ProductoFactory{
    static get(tipo){
        switch (tipo) {
            case 'memoria': return new productosDAOMemoria()
            case 'mongo': return new productosDAOMongo(connection)
    
            default: return new productosDAOMongo(connection)
        }
    }
} 

module.exports = ProductoFactory 