const Product  = require('../../schemas/producto');
const logger = require('../../utils/logger');

class ProductosDAO{
    constructor(connection){
        this.connection = connection
    }

    async crearProducto(prod){
        try{
            return await Product.create(prod)    
        }catch(err){
            logger.info(err)
        }
    } 

    async getProductos(){
        try{
            return await Product.find().lean()
        }catch(err){
            logger.info(err)
        }
    }

    async getProductoId(id){
        try{
            return await Product.findById({_id: id}).populate('opiniones').lean()
        }catch(err){
            logger.info(err)
        }       
    }           

    async getProductoByName(nombre){
        try {
            return await Product.find({nombre}).lean()
        } catch (error) {
            
        }
    }

    async getProductosByFiltro(precioMinimo, precioMaximo, categoria = null){
        try {
            let filtro = {precio: {$gte: precioMinimo, $lte : precioMaximo}};
            if(categoria){
                filtro.categoria = categoria;
            }
            return await Product.find(filtro).lean()
        } catch (error) {
            
        }
    }

    async actualizarProducto(id, nuevoValor1, nuevoValor2){
        try{
            return await Product.findByIdAndUpdate(id, {nombre: nuevoValor1, precio: nuevoValor2}).lean()
        }catch(err){
            logger.info(err)
        }
    }

    async eliminarProducto(id){
        try{
            return await Product.deleteOne({_id: id});
        }catch(err){
            logger.info(err)
        }
    }
}

module.exports = ProductosDAO