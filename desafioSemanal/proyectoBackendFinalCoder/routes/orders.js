import { Router } from 'express';
import authentication from './middlewares/authentication.js';
import { getOrders, postOrders } from '../controllers/orders.js';
const orders = Router();

orders.get("/", authentication, getOrders);
orders.post("/", authentication, postOrders);

export { orders };