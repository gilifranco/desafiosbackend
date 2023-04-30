const ProductoFactory = require('../factory/productosFactory');
const envConfig = require('../config/envConfig')

class ApiProductos{
    constructor(){
        this.productosFactory = ProductoFactory.get(envConfig.TIPO_PERSISTENCIA)
    }
    
    async postCrearProducto(nuevoProducto){
        return await this.productosFactory.crearProducto(nuevoProducto)
    }
    
    async getProductos(){
        return await this.productosFactory.getProductos()
    }
    
    async getProducto(id){
        return await this.productosFactory.getProductoId(id)
    }

    async getProductoByName(nombre){
        return await this.productosFactory.getProductoByName(nombre)
    }

    async getProductosByFiltro(precioMinimo, precioMaximo, categoria){
        return await this.productosFactory.getProductosByFiltro(precioMinimo, precioMaximo, categoria)
    }
    
    async getActualizarProductos(id){
        return await this.productosFactory.getProductoId(id)
    }
    
    async postActualizarProductos(id, newValue1, newValue2){
        return await this.productosFactory.actualizarProducto(id, newValue1, newValue2)
    }
    
    async eliminarProducto(id){
       return await this.productosFactory.eliminarProducto(id)
    }

}

module.exports = ApiProductos