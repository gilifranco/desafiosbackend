import { Router } from 'express';
import authentication from './middlewares/authentication.js';
import { getCarrito, postProductoCarrito, emptyCart } from '../controllers/cart.js';

const cart = Router();

cart.get("/", authentication, getCarrito);
cart.post("/", authentication, postProductoCarrito);
cart.delete("/:id", authentication, emptyCart);

export { cart };