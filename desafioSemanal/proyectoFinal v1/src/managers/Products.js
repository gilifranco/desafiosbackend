const Container = require('../models/Container');
let products = new Container('../models/products.txt');

const getProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            const productArray = await products.getAllProducts().then((resolve) => resolve);
            console.log(productArray);
            if (productArray.length <= 0) {
                throw new Error("There are no products");
            }
            res.json({"products": productArray});
        } else {
            const product = await products.getProductById(+id).then((resolve) => resolve);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            res.json(product);
        }
    } catch (error) {
        next(error);        
    }
}

const postProducts = async (req, res, next) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body;
        const validNames = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
        if (!title || !description || !code || !price || !thumbnail || !stock) {
            throw new Error("Tu producto debe tener nombre, descripcion, codigo, Url y stock")
        }
        if (price <= 0) {
            throw new Error("Precio mayor a 0")
        }
        if (!validNames.exec(title)) {
            throw new Error("El Titulo debe contener solo letras, numero y espacios");
        }
        if (!validNames.exec(description)) {
            throw new Error("La descripcion debe tener solo letras, numeros y espacios");
        }
        await products.saveProducts(req.body).then((resolve) => {
            res.json(resolve);
        });
    } catch (error) {
        next(error);
    }
}

const putProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description, code, price, thumbnail, stock } = req.body;
        const validNames = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
        const product = await products.getProductById(+id).then((res) => res);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        if (price <= 0) {
            throw new Error("El precio deb ser mayor a 0")
        }
        if (title && !validNames.exec(title)) {
            throw new Error("El Titulo debe contener solo letras, numero y espacios");
        }
        if (description && !validNames.exec(description)) {
            throw new Error("La descripcion debe tener solo letras, numeros y espacios");
        }
        await products.updateProduct(
            +id,
            title,
            description,
            code,
            price,
            thumbnail,
            stock
        ).then((resolve) => {
            res.json(resolve);
        });
    } catch (error) {
        next(error);
    }
}

const deleteProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await products.getProductById(+id).then((resolve) => resolve);
        if (!product) {
            throw new Error("Product not found")
        }
        await products.deleteProductById(+id).then((resolve) => {
            res.json(`${product.title} ha sido eliminado`);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getProducts, postProducts, putProducts, deleteProducts };