import mongoose from 'mongoose';

const collectionChat = 'listChat';

const schemaChat = new mongoose.Schema({
	author: {
		name: String,
	},
	text: String,
	fyh: String,
});

const modelChat = mongoose.model(collectionChat, schemaChat);

export default modelChat;
