const assert = require('assert');
const ProductosModel = require('../../src/models/Producto');

const compareData = (model, data) => {
	assert.deepStrictEqual(model.name, data.name);
	assert.deepStrictEqual(model.description, data.description ? data.description : '');
	assert.deepStrictEqual(model.imageUrl, data.imageUrl);
	assert.deepStrictEqual(model.brandName, data.brandName);
	assert.deepStrictEqual(model.attributes.style, data.style);
	assert.deepStrictEqual(model.attributes.ibu, data.ibu);
	assert.deepStrictEqual(model.attributes.abv, data.abv);
	assert.deepStrictEqual(model.price, data.price);
	assert.deepStrictEqual(model.inStock, data.inStock);
	assert.deepStrictEqual(model.isVisible, data.isVisible ? data.isVisible : true);
	assert.deepStrictEqual(model.launchDate, data.launchDate ? new Date(data.launchDate) : '');
};

describe('Test Product Model', () => {
	const data = {
		name: 'quilmes',
		imageUrl: 'hola',
		brandName: 'quilmes',
		style: 'amarga',
		ibu: 4,
		abv: 3,
		price: 100,
		inStock: true
	};

	const dataFalso = {
		name: 'quilmes',
		description: 'es rica',
		imageUrl: 'hola',
		brandName: 'quilmes',
		style: 'amarga',
		ibu: 4,
		abv: 3,
		price: 100,
		inStock: true,
		isVisible: true,
		launchDate: '06/05/2020'
	};

	it('Create Product Model', async () => {
		const productosModel = new ProductosModel(data);
		compareData(productosModel, data);
	});

	it('Should return "productos" when execute the collection function', () => {
		const { collection } = ProductosModel;
		assert.deepStrictEqual(collection, 'productos');
	});

	it('Should return "productos" when execute the collection instantiated function', () => {
		const voiceModel = new ProductosModel(data);
		const { collection } = voiceModel;
		assert.deepStrictEqual(collection, 'productos');
	});

	it('Should return an instantiated object when execute the "instantiate" function', () => {
		const user = ProductosModel.instantiate(data);
		compareData(user, data);
	});

	it('Create Product Model with complete field', async () => {
		const productosModel = new ProductosModel(dataFalso);
		compareData(productosModel, dataFalso);
	});
});
