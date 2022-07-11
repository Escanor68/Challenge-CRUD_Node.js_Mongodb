let app = null;
const productos = require('./productos');
const carrito = require('./carrito');

const defineRoute = (ruta, requests) => {
	const baseRequest = '/api/';
	const route = baseRequest + ruta;

	app.use(route, requests);
};

module.exports = aplication => {
	app = aplication;
	productos(defineRoute);
	carrito(defineRoute);
};
