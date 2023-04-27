import logger from '../services/logger.js';

const getSignUp = (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	if (req.isAuthenticated()) {
		return res.redirect('/products');
	}
	return res.render('User/registrarse');
};

const getSingIn = (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	if (req.isAuthenticated()) {
		res.redirect('/products');
	}
	res.render('User/ingresar');
};

const getErrorRegister = (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	return res.render('User/registerError');
};

const getErrorLogin = (req, res) => {
	const { url, method } = req;
	console.log("authenticate esta derivando al error");
	logger.info(`Ruta ${method} ${url}`);
	
	return res.render('User/login-error');
};

export { getSignUp, getErrorRegister, getSingIn, getErrorLogin };