const Cart  = require('../../schemas/carrito');
const logger = require('../../utils/logger');

class CarritosDAO{
    constructor(connection){
        this.connection = connection
    }
    
    async nuevoCarrito(user){
        try {
            return Cart.create({usuario: user});
        } catch (error) {
            logger.info(error)
        }
    }
    
    async getCarrito(id){
        try {
            return await Cart.find({usuario: {_id: id}}).populate('usuario').populate('items.producto').lean();
        } catch (error) {
            logger.info(error)
        }
    }

    async agregarProductoAlCarrito(id, prodId, precio){
        try {
            const carrito = await Cart.findOne({ usuario: id }).exec();
            const idsProductos = carrito.items.map((item) => item.producto.toString());
            const idsProductosInclude = idsProductos.includes(prodId);

            if(idsProductosInclude){
                await Cart.updateOne(
                    {usuario: id, 'items.producto': prodId},
                    {$inc: {'items.$.precio': precio, 'items.$.cantidad': 1}}
                )
            }else{
                await Cart.updateOne(
                    {usuario: id},
                    {$push :{items: {producto: prodId, precio}}}
                );  
            }

        } catch (error) {
            logger.info(error);
        }
    }

    async eliminarProductoDelCarrito(id, prodId){
        try {
            return await Cart.updateOne(
                {usuario: { _id: id }}, 
                {$pull: {items: {producto: prodId}}});
        } catch (error) {
            logger.info(error);
        }
    }

    async vaciarCarrito(id){
        try {
            return await Cart.updateOne(
                {usuario: { _id: id }},
                {$set: {items: [], subtotal: 0}}
                )
        } catch (error) {
            logger.info(error);
        }
    }
}

module.exports = CarritosDAO