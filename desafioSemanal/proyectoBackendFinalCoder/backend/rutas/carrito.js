const cartRouter = require('./router');
const estaAutenticado = require('../middlewares/autenticacion');
const ControladorCarritos = require('../controladores/carrito');

class RutasCarritos{
    constructor(){
         this.controlador = new ControladorCarritos() 
    }

    start(){
        cartRouter.post('/agregaralcarrito/:id', estaAutenticado, this.controlador.agregarProductoAlCarrito)
        cartRouter.get('/carrito', estaAutenticado, this.controlador.getCart)
        cartRouter.post('/vaciarcarrito', estaAutenticado, this.controlador.vaciarCarrito)
        cartRouter.post('/eliminardelcarrito/:id', estaAutenticado, this.controlador.eliminarProductoDelCarrito)
        cartRouter.post('/confirmarcompra', estaAutenticado, this.controlador.confirmarCompra)

        return cartRouter
    }
}

module.exports = RutasCarritos