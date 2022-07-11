const assert = require('assert');
const CarritoModel = require('../../src/models/Carrito');

const compareData = (model, data) => {
	assert.deepStrictEqual(model.name, data.name);
	assert.deepStrictEqual(model.imageUrl, data.imageUrl);
	assert.deepStrictEqual(model.price, data.price);
	assert.deepStrictEqual(model.quantity, data.quantity);
};

describe('Test Product Model', () => {
	const data = {
		email: 'john.doe@gmail.com',
		items: [
			{
				id: '507f1f77bcf86cd799439011',
				name: 'IPA super amarga',
				imageUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/238/beer-mug_1f37a.png',
				quantity: 3,
				price: 100
			}
		]
	};

	it('Create Product Model', async () => {
		const carritoModel = new CarritoModel(data);
		compareData(carritoModel, data);
	});

	it('Should return "carrito" when execute the collection function', () => {
		const { collection } = CarritoModel;
		assert.deepStrictEqual(collection, 'carrito');
	});

	it('Should return "carrito" when execute the collection instantiated function', () => {
		const voiceModel = new CarritoModel(data);
		const { collection } = voiceModel;
		assert.deepStrictEqual(collection, 'carrito');
	});

	it('Should return an instantiated object when execute the "instantiate" function', () => {
		const user = CarritoModel.instantiate(data);
		compareData(user, data);
	});
});
