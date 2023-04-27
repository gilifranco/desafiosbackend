import mongoose from 'mongoose';

const collectionProducts = 'listProducts';

const schemaProducts = new mongoose.Schema({
	timestamp: String,
	name: String,
	category: String,
	description: String,
	code: String,
	price: Number,
	photo: String,
	stock: Number,
});

const modelProducts = mongoose.model(collectionProducts, schemaProducts);

export default modelProducts;
