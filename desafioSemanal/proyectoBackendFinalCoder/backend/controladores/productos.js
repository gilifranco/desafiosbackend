const asyncHandler = require('express-async-handler');
const ApiProductos = require('../servicio/productos');
const ApiOpiniones = require('../servicio/opiniones');
const ApiFavoritos = require('../servicio/favoritos');
const logger = require('../utils/logger');

class ControladorProductos{
    constructor(){
        this.apiProductos = new ApiProductos()
        this.apiOpiniones = new ApiOpiniones()
        this.apiFavoritos = new ApiFavoritos()
    }

    getCrearProducto = asyncHandler(async (req, res) => {
        try {
            res.render('crearProducto')
        } catch (error) {
            logger.info(error)
        }
    })
    
    postCrearProducto = asyncHandler(async (req, res) => {
        try {
            const newProduct = req.body;
            await this.apiProductos.postCrearProducto(newProduct)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(error)
        }
    })
    
    getProductos = asyncHandler(async (req, res) => {
        try{
            const productos = await this.apiProductos.getProductos();

            if(req.user.rol === 'admin'){
                return res.render('inicioAdmin', {productos})
            }

            const favoritos = await this.apiFavoritos.getFavoritos(req.user._id);
            const productosFavoritos = favoritos[0].favoritos
            const idsProductosFavoritos = productosFavoritos.map((productoFavorito) => productoFavorito._id.toString());

            productos.forEach(producto => {
                if(idsProductosFavoritos.includes(producto._id.toString())){
                    producto.favorito = true
                }
            });  

            res.render('inicio', {productos})
        }catch(error){
            logger.info(error)
        }
    });

    getProducto = asyncHandler(async (req, res) => {
        try{
            const id = req.params.id;
            const producto = await this.apiProductos.getProducto(id);
            const opiniones = await this.apiOpiniones.getOpiniones(id);
            const opinionesYUsername =  opiniones.map(opinion => {
                return {
                    usuario: opinion.usuario.username,
                    opinion: opinion.opinion,
                    calificacion: opinion.calificacion,
                    fecha: opinion.createdAt
                };
            });
            let totalCalificaciones = 0;   
            const calificacionOpiniones =  opiniones.map(opinion => {
                return {
                    calificacion: opinion.calificacion
                };
            });   

            for (let i = 0; i < calificacionOpiniones.length; i++) {
                totalCalificaciones += calificacionOpiniones[i].calificacion;
            }
            
            const promedioDeCalificacion = (totalCalificaciones / calificacionOpiniones.length).toFixed(2);

            if(req.user.rol === 'admin'){
                return res.render('productoDetallesAdmin', {producto, opinionesYUsername, promedioDeCalificacion})
            }  
            res.render('productoDetalles', {producto, opinionesYUsername, promedioDeCalificacion})
        }catch(error){
            logger.info(error)
        }
    });

    postBuscarProducto = asyncHandler(async (req, res) => {
        try{
            const nombre = req.body.buscarProducto;
            res.redirect(`/api/productos/${nombre}`)
        }catch(error){
            logger.info(error)
        }
    });

    getBuscarProducto = asyncHandler(async (req, res) => {
        try{
            const nombre = req.params.nombre;
            const producto = await this.apiProductos.getProductoByName(nombre);
            const productoObj = producto[0];

            if(req.user.rol === 'admin'){
                return res.render('getProductoAdmin', {productoObj})
            }
            res.render('getProducto', {productoObj})
        }catch(error){
            logger.info(error)
        }
    });

    getProductosByFiltro = asyncHandler(async (req, res) => {
        const{precioMinimo, precioMaximo, categoria} = req.body;
        const productosFiltrados = await this.apiProductos.getProductosByFiltro(precioMinimo, precioMaximo, categoria);
        const cantidadDeProductosEncontrados = productosFiltrados.length;
        if(req.user.rol === 'admin'){
            return res.render('getProductosFiltradosAdmin', {productosFiltrados, cantidadDeProductosEncontrados})
        } 
        res.render('getProductosFiltrados', {productosFiltrados, cantidadDeProductosEncontrados})
    })
    
    getActualizarProductos = asyncHandler(async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await this.apiProductos.getActualizarProductos(id);
            res.render('actualizarProducto', {producto})
        } catch (error) {
            logger.info(error)
        }
    });
    
    postActualizarProductos = asyncHandler(async (req, res) => {
        try {
            const {nombre, precio} = req.body
            const id = req.params.id
            await this.apiProductos.postActualizarProductos(id, nombre, precio)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(error)
        }
    });
    
    eliminarProducto = asyncHandler(async (req, res) => {
        try {
            const id = req.params.id
            await this.apiProductos.eliminarProducto(id)
            res.redirect('/api/productos')
        } catch (error) {
            logger.info(err)
        }
    })

}

module.exports = ControladorProductos