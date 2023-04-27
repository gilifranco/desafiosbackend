import { Router } from 'express';

import { nonExistentRoute, redirection, getStart, getLogout } from '../controllers/landing.js';
import { deleteCarrito } from '../controllers/cart.js';

const start = Router();
const goOut = Router();
const notExist = Router();
const redirect = Router();

start.get('/', getStart);
goOut.get('/', getLogout, deleteCarrito );
redirect.get('/', redirection);
notExist.get('/', nonExistentRoute);

export { start, goOut, notExist, redirect };