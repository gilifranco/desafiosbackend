const mongoose = require('mongoose');

const opinionesCollection = "opiniones";

const opinionSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    producto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos'
    },
    opinion: {
        type: String,
        required: [true, 'porfavor agregue la opinion'],
        minLength: 1,
        maxLength: 100
    },
    calificacion: {
        type: Number,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
})

const Opinion = mongoose.model(opinionesCollection, opinionSchema);
module.exports = Opinion