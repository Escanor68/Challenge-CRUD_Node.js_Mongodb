const carritoModule = 'carrito/';

const { app: create } = require('./src/create');
const { app: added } = require('./src/added');
const { app: get } = require('./src/get');

module.exports = define => {
	define(carritoModule + 'create', create);
	define(carritoModule + 'added', added);
	define(carritoModule + 'get', get);
};
