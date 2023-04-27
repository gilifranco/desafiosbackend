import logger from '../../services/logger.js';
import modelProduc from '../models/modelsProduc.js';
import connectMongo from '../config/dataMongo.js';

connectMongo();

export default class productDB {
	
	async init() {
        console.log('products dao en mongodb -> listo!')
    }
	
	async disconnect() {
        console.log('products dao en mongodb -> cerrado!')
    }
	
	async add(data) {
		try {
			const dataAdd = new modelProduc(data);
			const add = await dataAdd.save(dataAdd);
			return add;
		} catch (err) {
			logger.error('Error al guardar el producto ' + err);
		}
	}
	
	async get(id) {
		try {
			if (id) {
				const data = await modelProduc.find({ _id: id });
				
				return data;
			} else {
				const data = await modelProduc.find();
				return data;
			}
		} catch (err) {
			logger.error('Error al burcar los productos ' + err);
		}
	}
	
	async getCat(param) {
		try {
			const result = await modelProduc.find({ category: param.category });
			return result;
		} catch (err) {
			logger.error('La categoria no existe ' + err);
		}
	}
	
	async getProductId(id) {
		try {
			const result = await modelProduc.findById(id);
			return result;
		} catch (err) {
			logger.error('Error al encontrar el producto ' + err);
		}
	}
	
	async update(id, data) {
		try {
			const update = await modelProduc.updateOne({ _id: id }, data);
			return update;
		} catch (err) {
			logger.error('Error al burcar y actualizar los productos ' + err);
		}
	}
	
	async delete(id) {
		try {
			const deelete = await modelProduc.deleteOne({ _id: id });
			return deelete;
		} catch (err) {
			logger.error('Error al burcar y eliminar los productos ' + err);
		}
	}
	
}