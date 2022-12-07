const Carts = require('../models/Cart');
const Container = require('../models/Container');
let carts = new Carts('../models/cart.txt');
let products = new Container('../models/products.txt');

const getProductsFromCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        const productsOfCart = await carts.getProductsFromCart(+id).then((res) => res);
        if (!productsOfCart) {
            throw new Error("Este producto no existe, intenta con otro");
        }
        res.json(productsOfCart);
    } catch (error) {
        next (error);
    }
}

const postCart = async (req, res, next) => {
    try {
        const {id_product} = req.body;
        const product = await products.getProductById(id_product).then((res) => res);
        if (!product) {
            throw new Error("No podemos sumar esto a tu carrito, el prodoucto no existe");
        }
        const carrito = {products: [product]};
        const cart = await carts.createCart(carrito).then((res) => res);
        res.json(cart.id);
    } catch (error) {
        next (error);
    }
}

const addProductToCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {id_product} = req.body;
        const product = await products.getProductById(+id, product).then((res) => res);
        if (!product) {
            throw new Error("El producto no existe");
        }
        const cart = await carts.addProductToCart(+id, product).then((res) => res);
        if (!cart) {
            throw new Error("Error404");
        }
        res.json(cart);
    } catch (error) {
        next (error);
    }
}

const deleteProductFromCart = async (req, res, next) => {
    try {
        const id_product = +req.params.id_prod;
        const id = +req.params.id;
        const product = await products.getProductById(id_product).then((res) => res);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        const cart = await carts.deleteProductFromCart(id, id_product).then((res) => res);
        if (!cart) {
            throw new Error("Carta no encontrada");
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const cart = await carts.deleteCartById(id).then((res) => res);
        if (!cart) {
            throw new Error("Producto eliminado");
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

module.exports = { getProductsFromCart, postCart, addProductToCart, deleteProductFromCart, deleteCart };