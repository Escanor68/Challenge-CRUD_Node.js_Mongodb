const productoModule = 'producto/';

const { app: create } = require('./src/create');
const { app: update } = require('./src/update');
const { app: getById } = require('./src/getById');
const { app: get } = require('./src/get');

module.exports = define => {
	define(productoModule + 'create', create);
	define(productoModule + 'update', update);
	define(productoModule + 'getById', getById);
	define(productoModule + 'get', get);
};
