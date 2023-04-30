const asyncHandler = require('express-async-handler');
const ApiOpiniones = require('../servicio/opiniones');
const ApiProductos = require('../servicio/productos');
const logger = require('../utils/logger');

class ControladorOpinones{
    constructor(){
        this.apiOpiniones = new ApiOpiniones()
        this.apiProductos = new ApiProductos()
    }

    postOpinion = asyncHandler(async (req, res) => {
        try{
            const {opinion, calificacion} = req.body;
            const {_id} = req.user._id;
            const productoId = req.params.id;

            const nuevaOpinion = {
                usuario: _id,
                producto: productoId,
                opinion,
                calificacion,
            };

            await this.apiOpiniones.crearOpinion(nuevaOpinion)

            res.redirect('/api/producto/:id')
        }catch(error){
            logger.info(error)
        }
    });

    postFiltrarOpiniones = asyncHandler(async (req, res) => {
        try{
            const id = req.params.id;
            const producto = await this.apiProductos.getProducto(id);
            const{ordenar} = req.body;
            const opinionesFiltradas = await this.apiOpiniones.getOpinionesByFiltro(ordenar, id);
            const opinionesYUsernameFiltradas =  opinionesFiltradas.map(opinion => {
                return {
                    usuario: opinion.usuario.username,
                    opinion: opinion.opinion,
                    calificacion: opinion.calificacion,
                    fecha: opinion.createdAt
                };
            }); 
            const estanFiltradas = true
            res.render('productoDetalles', {producto, opinionesYUsernameFiltradas, estanFiltradas})
        }catch(error){
            logger.info(error)
        }
    });
}

module.exports = ControladorOpinones