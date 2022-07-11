const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const ProductoModule = require('../../../src/models/Producto');
const { mockRequest, mockResponse } = require('../../mocks');
const { handler } = require('../../../src/routes/productos/src/getById');

describe('Get Producto For Id Test', () => {
	afterEach(() => sandbox.restore());

	// algunas variables
	const fakedata = {
		name: 'stella',
		description: 'es rica',
		imageUrl: 'stella',
		brandName: 'stella',
		attributes: {
			style: 'dulce',
			ibu: 5,
			abv: 4
		},
		price: 200,
		inStock: false,
		isVisible: false,
		launchDate: '11/04/2022'
	};
	const productId = '62502ac5d8e2121cf84e8267';
	const fakedata2 = null;
	const fakeBody = null;

	context('When no error occurs', () => {
		it('Should return 200 if find the product', async () => {
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

			const req = mockRequest(fakeBody, { productId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Producto: fakedata });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productId);
		});
	});
	context('When error occurs', () => {
		it('Should return 404 if Product not found', async () => {
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata2);

			const req = mockRequest(fakeBody, { productId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 404);
			assert.deepStrictEqual(res.json, { message: `No se encontro el producto con el id ${productId}` });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productId);
		});

		it('Should return 400 if validate ObjectId wrong', async () => {
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata2);

			const req = mockRequest({ productId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"value" is required' });

			sandbox.assert.notCalled(ProductoModule.getById);
		});

		it('Should return 500 if method database fails', async () => {
			sandbox.stub(ProductoModule, 'getById').rejects(new Error('Error in database'));

			const req = mockRequest(fakeBody, { productId });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in database' });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productId);
		});
	});
});
