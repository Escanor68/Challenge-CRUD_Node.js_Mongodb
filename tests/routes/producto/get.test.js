const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const ProductoModule = require('../../../src/models/Producto');
const { mockRequest, mockResponse } = require('../../mocks');
const { handler } = require('../../../src/routes/productos/src/get');

describe('Get Product get test', () => {
	afterEach(() => sandbox.restore());

	// algunas variables

	const fakedata = {
		Productos: [
			{
				_id: '624f50a28f72f74e30bb7dc1',
				name: 'honey',
				description: '',
				imageUrl: 'hola',
				brandName: 'quilmes',
				attributes: {
					style: 'amarga',
					ibu: 4,
					abv: 3
				},
				price: 100,
				inStock: true,
				isVisible: true,
				launchDate: ''
			},
			{
				_id: '624f50c38f72f74e30bb7dc2',
				name: 'honey',
				description: '',
				imageUrl: 'hola',
				brandName: 'quilmes',
				attributes: {
					style: 'amarga',
					ibu: 4,
					abv: 3
				},
				price: 100,
				inStock: true,
				isVisible: true,
				launchDate: ''
			}
		]
	};

	const fakedata2 = null;

	context('When no error occurs', () => {
		it('Should return 200 if everyone prodocts without filters', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata);

			const req = mockRequest({}, {}, {});
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Productos: fakedata });

			sandbox.assert.calledOnceWithExactly(ProductoModule.get, {}, {});
		});

		it('Should return 200 if nothing', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata2);

			const req = mockRequest({}, {}, {});
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { message: 'products empty' });

			sandbox.assert.calledOnceWithExactly(ProductoModule.get, {}, {});
		});

		it('Should return 200 if everyone prodocts with filters', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata);

			const req = mockRequest({}, {}, { brandName: 'quilmes', order: 'lessBitter' });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Productos: fakedata });

			sandbox.assert.calledOnceWithExactly(ProductoModule.get, { brandName: 'quilmes' }, { ibu: 1 });
		});

		it('Should return 200 if everyone prodocts with filters', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata);

			const req = mockRequest({}, {}, { isVisible: 'true', order: 'lessBitter' });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Productos: fakedata });

			sandbox.assert.calledOnceWithExactly(ProductoModule.get, { isVisible: 'true' }, { ibu: 1 });
		});

		it('Should return 200 if everyone prodocts with filters', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata);

			const req = mockRequest({}, {}, { inStock: 'true', order: 'lessBitter' });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { Productos: fakedata });

			sandbox.assert.calledOnceWithExactly(ProductoModule.get, { inStock: 'true' }, { ibu: 1 });
		});
	});

	context('When error occurs', () => {
		it('Should return 400 if query(brandName) fail', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata2);

			const req = mockRequest({}, {}, { brandName: 5 });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"brandName" must be a string' });

			sandbox.assert.notCalled(ProductoModule.get);
		});

		it('Should return 400 if query(inStock) fail', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata2);

			const req = mockRequest({}, {}, { inStock: 5 });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"inStock" must be a boolean' });

			sandbox.assert.notCalled(ProductoModule.get);
		});

		it('Should return 400 if query(isVisible) fail', async () => {
			sandbox.stub(ProductoModule, 'get').resolves(fakedata2);

			const req = mockRequest({}, {}, { isVisible: 5 });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"isVisible" must be a boolean' });

			sandbox.assert.notCalled(ProductoModule.get);
		});

		it('Should return 500 if method database fails', async () => {
			sandbox.stub(ProductoModule, 'get').rejects(new Error('Error in database'));

			const req = mockRequest({}, {}, {});
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in database' });

			sandbox.assert.calledOnceWithExactly(ProductoModule.get, {}, {});
		});
	});
});
