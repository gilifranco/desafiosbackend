import logger from '../services/logger.js';

import daoOrders from '../Database/DAO/orders.js';
import daoCart from '../Database/DAO/cart.js';

const orders = new daoOrders();
const cart = new daoCart();

const getOrders = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
    
    const mail = req.user.username;
    
    const result = await orders.getOrder(mail)
    
    res.json(result);
};

const postOrders = async (req, res) => {
	const { url, method, user } = req;
	logger.info(`Ruta ${method} ${url}`);
    
    const mail = user.username;
    console.log(mail);
    let aux = [];
    
    const cartFinished = await cart.getCart(mail);
    cartFinished.forEach( x => x.productos.forEach( x => aux.push(x) ) );
    
    await orders.postOrder( user, aux );
    await cart.deleteCart( mail );
    
    logger.info('Orden generada');
    
    res.redirect('/products');
};

export { getOrders, postOrders }