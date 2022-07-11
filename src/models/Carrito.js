const Model = require('../../modules/class/Model');

class Carrito extends Model {

	constructor({
		email, items = []
	}) {
		super();
		this.email = email;
		this.items = items;
	}

	static get collection() {
		return 'carrito';
	}

	get collection() {
		return 'carrito';
	}

	static instantiate(obj) {
		return new Carrito(obj);
	}
}

module.exports = Carrito;
