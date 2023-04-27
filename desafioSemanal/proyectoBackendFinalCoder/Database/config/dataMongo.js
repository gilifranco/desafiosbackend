import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../../services/logger.js';

dotenv.config();

const { MONGO, URLPARS, UNIFIED } = process.env;

const connectMongo = async () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect(MONGO, {
			useNewUrlParser: URLPARS,
			useUnifiedTopology: UNIFIED,
		});
		logger.info('MongoDb Connected');
	} catch (error) {
		logger.error('Error connecting to database', error);
	}
};

export default connectMongo;