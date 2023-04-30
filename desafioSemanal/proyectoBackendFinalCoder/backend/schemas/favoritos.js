const mongoose = require('mongoose');

const favoritosCollection = "favoritos";

const favoritosSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    favoritos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos'
    }]
})


const Favoritos = mongoose.model(favoritosCollection, favoritosSchema);
module.exports = Favoritos