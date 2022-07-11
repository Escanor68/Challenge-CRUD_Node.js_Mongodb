const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const CarritoModule = require('../../../src/models/Carrito');
const ProductoModule = require('../../../src/models/Producto');
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

	const fakeBody = {
		id: '624f50a28f72f74e30bb7dc1',
		quantity: 6
	};

	const handlerModify = {
		lastErrorObject: { n: 1, updatedExisting: true },
		value: {
			_id: '626306748622ba3f5b533d99',
			email: 'fulano@gmail.com',
			items: [[Object]]
		},
		ok: 1,
		$clusterTime: {
			clusterTime: { t: 1650892385, i: 4 },
			signature: {
				keyId: '7057902504633171969'
			}
		},
		operationTime: { t: 1650892385, i: 4 }
	};

	const handlerModify2 = {
		lastErrorObject: { n: 1, updatedExisting: true },
		value: {
			_id: '626306748622ba3f5b533d99',
			email: 'fulano@gmail.com',
			items: [[Object][Object]]
		},
		ok: 1,
		$clusterTime: {
			clusterTime: { t: 1650892385, i: 4 },
			signature: {
				keyId: '7057902504633171969'
			}
		},
		operationTime: { t: 1650892385, i: 4 }
	};

	context('When error no occurs', () => {
		it.only('Should return 200 if added the quantity to cart', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Carrito: fakedata });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
			sandbox.assert.calledOnceWithExactly(CarritoModule.findOneAndModify, carritoId, fakedata);
		});

		it('Should return 200 if added the product to cart', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify2);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Carrito: fakedata });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
			sandbox.assert.calledOnceWithExactly(CarritoModule.findOneAndModify, carritoId, fakedata);
		});
	});

	context('When error occurs', () => {

		it('Should return 404 if cart not found', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata2);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify2);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 404);
			assert.deepStrictEqual(res.json, { message: `No se encontro el Carrito con el id ${carritoId}` });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
			sandbox.assert.calledOnceWithExactly(CarritoModule.findOneAndModify, carritoId, fakedata);

		});

		it('Should return 404 if product not found', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata2);
			sandbox.stub(ProductoModule, 'getById').resolves(null);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify2);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 404);
			assert.deepStrictEqual(res.json, { message: `No se encontro el Carrito con el id ${carritoId}` });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
			sandbox.assert.calledOnceWithExactly(CarritoModule.findOneAndModify, carritoId, fakedata);

		});

		it('Should return 400 if validate ObjectId wrong', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata2);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify2);

			const req = mockRequest(fakeBody, { id });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"value" is required' });

			sandbox.assert.notCalled(CarritoModule.getById);
			sandbox.assert.calledOnceWithExactly(CarritoModule.findOneAndModify, carritoId, fakedata);

		});

		it.only('Should return 400 if validate body (id) wrong', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify);

			const req = mockRequest({ ...fakeBody, id: true }, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"id" must be one of [string, object]' });

			sandbox.assert.notCalled(CarritoModule.getById);
			sandbox.assert.notCalled(CarritoModule.findOneAndModif);

		});

		it('Should return 400 if validate body (quantity) wrong', async () => {
			sandbox.stub(CarritoModule, 'getById').resolves(fakedata);
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify);

			const req = mockRequest({ ...fakeBody, email: true }, { carritoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"quantity" must be a number' });

			sandbox.assert.notCalled(CarritoModule.getById);
			sandbox.assert.notCalled(CarritoModule.findOneAndModify);
		});

		it('Should return 500 if method database fails', async () => {
			sandbox.stub(CarritoModule, 'getById').rejects(new Error('Error in database'));
			sandbox.stub(CarritoModule, 'findOneAndModify').resolves(handlerModify2);

			const req = mockRequest(fakeBody, { carritoId });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in database' });

			sandbox.assert.calledOnceWithExactly(CarritoModule.getById, carritoId);
			sandbox.assert.calledOnceWithExactly(CarritoModule.findOneAndModify, carritoId, fakedata);
		});
	});
});
