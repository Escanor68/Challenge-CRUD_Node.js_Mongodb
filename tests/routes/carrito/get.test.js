const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const CarritoModule = require('../../../src/models/Carrito');
const { mockRequest, mockResponse } = require('../../mocks');
const { handler } = require('../../../src/routes/carrito/src/get');

describe('Get Carrito For Id Test', () => {
	afterEach(() => sandbox.restore());

	// algunas variables
	const fakedata = {
		Carrito: {
			_id: '626306748622ba3f5b533d99',
			email: 'fulano@gmail.com',
			items: [
				{
					id: '624f50a28f72f74e30bb7dc1',
					name: 'honey',
					imageUrl: 'hola',
					quantity: 18,
					price: 100
				}
			]
		}
	};
	const carritoId = '626306748622ba3f5b533d99';
	const id = '626306748622ba3f5b533d99';
	const fakedata2 = null;
	const fakeBody = null;

	context('When no error occurs', () => {
		it('Should return 200 if find the cart', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Carrito: fakedata });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
		});
	});
	context('When error occurs', () => {
		it('Should return 404 if cart not found', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata2);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 404);
			assert.deepStrictEqual(res.json, { message: `No se encontro el Carrito con el id ${carritoId}` });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
		});

		it('Should return 400 if validate ObjectId wrong', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata2);

			const req = mockRequest(fakeBody, { id });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"value" is required' });

			sandbox.assert.notCalled(CarritoModule.getById);
		});

		it('Should return 500 if method database fails', async () => {
			sandbox.stub(CarritoModule, 'getById').rejects(new Error('Error in database'));

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in database' });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
		});
	});
});
