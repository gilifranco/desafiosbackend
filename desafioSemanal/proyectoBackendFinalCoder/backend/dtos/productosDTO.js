class productoDTO{
    constructor({nombre, precio}){
        this.nombre = nombre,
        this.precio = precio
    }
}

const trasformarADto = (productos) => {
    if(Array.isArray(productos)){
        return productos.map(p => new productoDTO(p))
    }
}

module.exports = trasformarADto