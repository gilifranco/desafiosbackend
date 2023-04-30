const logger = require('../../utils/logger');

class ProductosDAO{
    constructor(){
        this.productos = []
    }

    async crearProducto(prod){
        try {
            this.productos.push(prod)
        } catch (error) {
            logger.info(err)
        }
    }

    async getProductos(){
        try{
            const productos = this.productos;
            return productos
        }catch(err){
            logger.info(err)
        }
    }

    async getProductoId(id){
        try{
            const producto = this.productos.find(prod => prod.id === id);
            return producto
        }catch(err){
            logger.info(err)
        }       
    } 

    async actualizarProducto(id, nuevoValor1, nuevoValor2){
        try{
            const productoActualizado = this.productos.map(prod => prod.id === id ? {
                nombre: nuevoValor1,
                precio: nuevoValor2
            }: this.productos);
            return productoActualizado
        }catch(err){
            logger.info(err)
        }
    }

    async eliminarProducto(id){
        try{
            const productoEliminado = this.productos.filter(prod => prod.id !== id);
            return productoEliminado
        }catch(err){
            logger.info(err)
        }
    }
}