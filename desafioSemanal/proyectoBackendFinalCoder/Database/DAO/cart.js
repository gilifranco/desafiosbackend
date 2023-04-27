import logger from '../../services/logger.js';
import modelCart from '../models/modelsCart.js';
import connectMongo from '../config/dataMongo.js';

connectMongo();

export default class daoCart {
	
	async init() {
        console.log('cart dao en mongodb -> listo!')
    }
	
	async disconnect() {
        console.log('cart dao en mongodb -> cerrado!')
    }
	
	async getCart(correo) {
		try {
			const cart = await modelCart.find({ 'author.username': correo });
			return cart;
		} catch (err) {
			logger.error('Error al buscar el carrito ' + err);
		}
	}
	
	async addCart(usuario) {
		const data = {
			author: {
				name: usuario.name,
				lastName: usuario.lastName,
				address: usuario.address,
				phoneNumber: usuario.phoneNumber,
				username: usuario.username,
			},
			productos: [],
			timestamp: Date.now(),
		};
		
		const cartAdd = new modelCart(data)
		const result = await cartAdd.save();
		
		logger.info('se guardo el carrito');
		
		return result;
	}
	
	async addProductCart(correo, data){
		try {
			const cart = await modelCart.updateOne({ 'author.username': correo }, { $push: { productos: { $each: data } } });
			logger.info('producto agregado al carrito');
			return cart;
		} catch (error) {
			logger.error(error);
		}
	}

	async increment(codeProduct){
		try {
			const cart = await modelCart.updateOne(
				{"productos.code": codeProduct },
				{ $inc: { "productos.$.cant": 1 } },
				{ "multi": true }
			);
			logger.info('se incrementa en 1 la cantidad');
			return cart;
		} catch (error) {
			logger.error(error);
		}
	}

	async updateCart(correo, data) {
		try {
			const producUpdate = await modelCart.updateOne({ author: { username: correo } }, data);
			return producUpdate;
		} catch (err) {
			logger.error('Error al buscar el carrito y actualizar ' + err);
		}
	}
	
	async deleteCart(correo) {
		try {
			const producDelete = await modelCart.deleteOne({ 'author.username': correo  });
			logger.info('Cart deleted');
			return producDelete;
		} catch (error) {
			logger.error('Error al borrar el carrito ' + err);
		}
	}

	async emptyCart( correo, data ) {
		try {
			const result = await modelCart.updateOne({ 'author.username': correo }, { $pull: { productos: { $gte: data } } });
			return result
		} catch (error) {
			logger.error('Error al actualizar ' + err);
		}
	}
}