const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger');
const sendEmail = require('../utils/enviarEmail');
const sendWpp = require('../utils/enviarWpp');
const ApiCarrito = require('../servicio/carrito');
const ApiProductos = require('../servicio/productos');

class ControladorCarritos{
    constructor(){
        this.apiCarritos = new ApiCarrito()
        this.apiProductos = new ApiProductos()
    }

    agregarProductoAlCarrito = asyncHandler(async (req, res) => {
        try {
            const producto = await this.apiProductos.getProducto(req.params.id);
            await this.apiCarritos.agregarProductoAlCarrito(req.user._id, req.params.id, producto.precio)
            res.redirect('/api/productos') 
        } catch (error) {
            logger.info(error)
        }
    })
    
    getCart = asyncHandler(async (req, res) => {
        try {
            const cartUsuario = await this.apiCarritos.getCart(req.user._id);
            const productosCarrito = cartUsuario[0].items;
            const preciosProductosCarrito = [];
            productosCarrito.map((productoCarrito) => {
            preciosProductosCarrito.push(productoCarrito.producto.precio * productoCarrito.cantidad)
            })
            const initialVal = 0;
            const subtotal = preciosProductosCarrito.reduce((acc, currVal) => acc + currVal, initialVal);
            let productosEnCarrito = false;
            if(productosCarrito.length > 0){
                productosEnCarrito = true
            }else{
                false
            }
            res.render('carrito', {productosCarrito, productosEnCarrito, subtotal}) 
            } catch (error) {
            logger.info(error)
        }
    })
    
    eliminarProductoDelCarrito = asyncHandler(async (req, res) => {
        try{
            await this.apiCarritos.eliminarProductoDelCarrito(req.user._id, req.params.id)
            res.redirect('/api/carrito')
        }catch(error){
            logger.info(error)
        }
    });
    
    vaciarCarrito = asyncHandler(async (req, res) => {
        try {
            await this.apiCarritos.vaciarCarrito(req.user._id)
            res.redirect('/api/carrito')
        } catch (error) {
            logger.info(error)
        }
    });
    
    confirmarCompra = asyncHandler(async (req, res) => {
        try {
            const carritoUsuario = await this.apiCarritos.getCart(req.user._id)

            //ENVIAR WHATSAPP
            let mensajeWpp = `
            Nuevo pedido de  ${req.user.username}, ${req.user.email}
            pedido: ${carritoUsuario[0].productos}
            `
    
            //ENVIAR MAIL
            let from = process.env.EMAIL_USER;
            let to = process.env.ADMIN_EMAIL;
            let subject = `<p>Nuevo pedido de ${req.user.username}, ${req.user.email}</p>`;
            let mensajeEmail = `
            <div>
            <h4>Productos:</h4>
            <li>${carritoUsuario[0].productos}</li>
            </div>
            `
                await sendWpp(mensajeWpp)
                await sendEmail(from, to, subject, mensajeEmail)
                await this.apiCarritos.vaciarCarrito(req.user._id)
                res.json({msg: 'compra confirmada'})
    }catch (error) {
        throw new Error ('mail no enviado' + error)
    } 
})
    
}

module.exports = ControladorCarritos