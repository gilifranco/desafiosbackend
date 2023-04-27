import logger from '../../services/logger.js';
import modelUser from '../models/modelsUser.js';
import connectMongo from '../config/dataMongo.js';

connectMongo();
export default class daoUser {
	async get(data) {
		try {
			const user = await modelUser.findOne({ username: data });
			return user;
		} catch (err) {
			logger.error('Error al burcar un usuario ' + err);
		}
	}

	async add(data) {
		try {
			const dataAdd = new modelUser(data);
			const add = await dataAdd.save();
			return add;
		} catch (err) {
			logger.error('Error al guardar el usaurio ' + err);
		}
	}
}
