import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

import daoChat from './Database/DAO/chat.js'
import { register, login } from './routes/session.js';
import { start, goOut, notExist, redirect } from './routes/landing.js';
import { products } from './routes/products.js';
import { messages } from './routes/chat.js';
import { cart } from './routes/cart.js';
import { orders } from './routes/orders.js';

import { createServer } from 'http';
import { Server } from 'socket.io';

import passport from 'passport';
import dotenv from 'dotenv';
import logger from './services/logger.js';

dotenv.config();

const { PORT, MONGO, URLPARS, UNIFIED, RESAVE, SAVEUNI, ROLLING } = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const chat = new daoChat();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: MONGO,
			mongoOptions: { useNewUrlParser: URLPARS, useUnifiedTopology: UNIFIED },
		}),
		secret: 'secretito',
		resave: RESAVE,
		saveUninitialized: SAVEUNI,
		rolling: ROLLING,
		cookie: {
			maxAge: 600000,
		},
	})
	);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/home', start);
app.use('/register', register);
app.use('/login', login);
app.use('/products', products);
app.use('/cart', cart);
app.use('/orders', orders);
app.use('/chat', messages);
app.use('/exit', goOut);
app.use('/', redirect);
app.use('*', notExist); 

io.on('connection', async (socket) => {
    console.log("io nos esta escuchando");
    
	const listaMensajes = await chat.getChat();
    
    socket.emit('messages', listaMensajes);
    
    socket.on('new-message', async (data) => {
        
        if (listaMensajes.length === 0) {
			return await chat.addChat({
				...data,
				fyh: new Date().toLocaleString(),
				id: 1,
			});
		}
		await chat.addChat({
			...data,
			fyh: new Date().toLocaleString(),
			id: listaMensajes.length + 1,
		});
        
        io.sockets.emit('messages', listaMensajes);
    });
});

httpServer.listen(PORT, () => {
	logger.info(`RUN http://localhost:${PORT}/home processID: ${process.pid}`);
});