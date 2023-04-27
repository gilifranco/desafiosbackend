import { Router } from 'express';
import { textChat } from '../controllers/chat.js';

const messages = Router();

messages.get('/', textChat);

export { messages };