const mongoose = require('mongoose');

const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
    rol:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'porfavor escriba un mail valido',
          ] 
    },
    direccion:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    avatar:{
        type: String
    },
    carrito:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    favoritos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favoritos'
    }]
})


const User = mongoose.model(userCollection, userSchema);
module.exports = User