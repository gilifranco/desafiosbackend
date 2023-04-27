import logger from '../services/logger.js';

const nonExistentRoute = (req, res) => {
	const { url, method } = req;
	logger.warn(`Ruta ${method} ${url} no esta implementada`);
	res.send(`Ruta ${method} ${url} no esta implementada`);
};

const redirection = (req, res) => {
	res.redirect('/home');
};

const getStart = (req, res) => {
	const { url, method, user } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	if (user === undefined) {
		return res.render('User/inicioUser');
	}
	
	const avatar = user.photo;
	const saludo = `Bienvenido ${user.username}`;
	
	if ( req.user?.admin ) {
		return res.render('Admin/inicioAdmin', { saludo, avatar });
	}
	return res.render('UserLogin/inicioUserLogin', { saludo, avatar });
};

const getLogout = (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	const user = req.user.username;
	
	req.logout((err) => {
		const saludo = `Hasta luego ${user}`;
		return res.render('saludo', { saludo });
	});
};

export { redirection, getStart, getLogout, nonExistentRoute };