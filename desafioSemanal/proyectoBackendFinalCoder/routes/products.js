import { Router } from 'express';

import authentication from './middlewares/authentication.js';
import { get, getProductId, getCategory, getB, add, update, Delete } from '../controllers/products.js';

const products = Router();

products.get('/', get);
products.get('/:_id', getProductId);
products.get('/categorias/:category', getCategory);
products.post('/busqueda', getB);
products.post('/', authentication, add);
products.put('/:id', authentication, update);
products.delete('/:id', authentication, Delete);

export { products };