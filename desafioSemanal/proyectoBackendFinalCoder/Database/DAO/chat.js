import logger from '../../services/logger.js';
import modelChat from '../models/modelsChat.js';
import connectMongo from '../config/dataMongo.js';

connectMongo();

export default class daoChat {
	
	async init() {
        console.log('chat dao en mongodb -> listo!')
    }
	
	async disconnect() {
        console.log('chat dao en mongodb -> cerrado!')
    }
	
	async getChat() {
		try {
			const data = await modelChat.find({}, { _id: 0, __v: 0 });
			return data;
		} catch (err) {
			logger.error('Error al burcar los mensajes ' + err);
		}
	}
	
	async addChat(data) {
		try {
			const dataAdd = new modelChat(data);
			const add = await dataAdd.save();
			return add;
		} catch (error) {
			logger.error('Error al guardar el mensaje ' + err);
		}
	}
}