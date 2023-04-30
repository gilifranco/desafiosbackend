const mongoose = require('mongoose');

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    items:[{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos'
        },
        cantidad: {
            type: Number,
            default: 1,
            required: true
        },
        precio:{
            type: Number,
            required: true,
            default: 0
        }
}] ,
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    subtotal:{
        type: Number,
        default: 0
    }
})

const Cart = mongoose.model(cartCollection, cartSchema);
module.exports = Cart