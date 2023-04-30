const asyncHandler = require('express-async-handler');
const passport = require('passport');
const logger = require('../utils/logger');

class ControladorAutenticacion{
    constructor(){

    }

    getRegistro = asyncHandler(async(req, res) => {
        try {
            res.render('registro')
        } catch (error) {
            logger.info(error)
        }
    })
    
    postRegistro = passport.authenticate('register', {failureRedirect: '/api/auth/registrarse', successRedirect: '/api/productos'})
    
    getLogin = asyncHandler(async(req, res) => {
        try {
            res.render('login')
        } catch (error) {
            logger.info(error)
        }
    })
    
    postLogin = passport.authenticate('login', {failureRedirect: '/api/auth/login', successRedirect: '/api/productos'})
    
    getLogout = asyncHandler(async(req, res) => {
        req.logout(err => {
            err ? logger.info(err) : res.redirect('/api/auth/login')
        })
    })    
}

module.exports = ControladorAutenticacion