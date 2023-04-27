import { Router } from 'express';
import passport from 'passport';
import multer from "multer";

import { getSignUp, getErrorRegister, getSingIn, getErrorLogin } from '../controllers/session.js';
import { passLogin, passRegister } from './middlewares/credentials.js';

const register = Router();
const login = Router();

const upload = multer( { dest: './public/img/uploads/' } );

passport.use('register', passRegister );
passport.use('login', passLogin );

register.get('/', getSignUp);
register.post('/', upload.single('photo'), passport.authenticate('register', { failureRedirect: 'register/errorRegistro', successRedirect: '/home' }));
register.get('/registrationError', getErrorRegister);

login.get('/', getSingIn);
login.post('/', passport.authenticate('login', { failureRedirect: '/login/errorLogin', successRedirect: '/home' }));
login.get('/errorLogin', getErrorLogin);

export { register, login };