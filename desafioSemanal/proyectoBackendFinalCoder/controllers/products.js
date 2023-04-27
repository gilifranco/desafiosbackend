import logger from '../services/logger.js';
import daoProducts from '../Database/DAO/products.js';

const products = new daoProducts();

const get = (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	if (req.user === undefined) {
		return products.get()
			.then((productos) => {
				res.render('User/productosUser', { productos });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	
	if (req.user?.admin) {
		return products.get()
			.then((productos) => {
				res.render('Admin/productosAdmin', { productos, saludo, avatar });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	products.get()
		.then((productos) => {
			res.render('UserLogin/productosUserLogin', { productos, saludo, avatar });
		})
		.catch((err) => {
			res.json(err);
		});
};

const getProductId = ( req, res ) => {
	const { url, method } = req;
	const param = req.params;
	logger.info(`Ruta ${method} ${url}`);
	
	if (req.user === undefined) {
		return products.get(param)
			.then((productos) => {
				res.render('User/productosUser', { productos });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${req.user.username}`;
	
	return products.get(param)
		.then((productos) => {
			if(productos === undefined){
				return res.json('el producto no existe en la base de datos');
			}
			if(req.user?.admin) {
				return res.render('Admin/productosAdmin', { productos, saludo, avatar });
			}
			
			res.render('UserLogin/productosUserLogin', { productos, avatar, saludo });
		})
		.catch((err) => {
			res.json(err);
		});
}

const getCategory = ( req, res ) => {
	const { url, method } = req;
	const param = req.params;
	logger.info(`Ruta ${method} ${url}`);

	if (req.user === undefined) {
		return products.getCat(param)
			.then((productos) => {
				res.render('User/productosUser', { productos });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${req.user.username}`;
	
	return products.getCat(param)
		.then((productos) => {
			if(productos === undefined){
				return res.json('el producto no existe en la base de datos');
			}
			if(req.user?.admin) {
				return res.render('Admin/productosAdmin', { productos, saludo, avatar });
			}
			
			res.render('UserLogin/productosUserLogin', { productos, avatar, saludo });
		})
		.catch((err) => {
			res.json(err);
		});
}

const getB = (req, res) => {
	const name = req.body.nameb.charAt(0).toUpperCase() + req.body.nameb.slice(1);
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	if (req.user === undefined) {
		return products.get(name)
			.then((productos) => {
				res.render('User/productosUser', { productos });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	if (req.user?.admin) {
		return products
			.get(name)
			.then((productos) => {
				res.render('Admin/productosAdmin', { productos, saludo, avatar });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	products
		.get(name)
		.then((productos) => {
			res.render('UserLogin/productosUserLogin', { productos, saludo, avatar });
		})
		.catch((err) => {
			res.json(err);
		});
};

const add = (req, res) => {
	const { url, method, body } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	const newProduct = {
		timestamp: Date.now(),
		name: body.name.toLowerCase().charAt(0).toUpperCase() + body.name.slice(1),
		category: body.category,
		description: body.description,
		code: body.code,
		price: body.price,
		photo: body.photo,
		stock: body.stock,
	};
	
	return products.add(newProduct)
		.then(() => {
			res.redirect('/products');
		})
		.catch((err) => {
			res.json(err);
		});
};

const update = (req, res) => {
	const { url, method, body } = req;
	const id = req.params.id;
	logger.info(`Ruta ${method} ${url}`);
	
	const newProduct = {
		timestamp: Date.now(),
		name: body.name,
		description: body.description,
		code: body.code,
		price: body.price,
		photo: body.photo,
		stock: body.stock,
	};
	return products.update(id, newProduct)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
};

const Delete = (req, res) => {
	const { url, method } = req;
	const id = req.params.id;
	
	logger.info(`Ruta ${method} ${url}`);
	
	return products.delete(id)
		.then(() => {
			res.redirect('/products');
		})
		.catch((err) => {
			res.json(err);
		});
};

export { get, getProductId, getCategory, getB, add, update, Delete };