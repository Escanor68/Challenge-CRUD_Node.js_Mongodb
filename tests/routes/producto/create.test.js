const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const { mockRequest, mockResponse } = require('../../mocks');

const { handler } = require('../../../src/routes/productos/src/create');
const ProductosModel = require('../../../src/models/Producto');

describe('Create product api Test', () => {
	afterEach(() => sandbox.restore());

	const datoFalso = {
		name: 'quilmes',
		description: '',
		imageUrl: 'hola',
		brandName: 'quilmes',
		style: 'amarga',
		ibu: 4,
		abv: 3,
		price: 100,
		inStock: true,
		isVisible: true,
		launchDate: ''
	};

	const {
		ibu, abv, price, inStock, isVisible, launchDate, ...datoFalsoSoloEnLosString
	} = datoFalso;

	const datoFalsoSoloEnLosNumero = ['ibu', 'abv', 'price'];

	const datoFalsoSoloEnLosBoolean = ['inStock', 'isVisible'];

	const falsoId = {
		acknowledged: true,
		insertedId: '6214f692bedfc49496526921'
	};

	context('When no error occurs', () => {
		it('Should return 200 if create product is successful', async () => {
			sandbox.stub(ProductosModel.prototype, 'insert').resolves(falsoId);
			const req = mockRequest(datoFalso);
			const res = mockResponse();
			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			sandbox.assert.calledOnceWithExactly(ProductosModel.prototype.insert);
		});
	});
	context('When error is returned', () => {
		context('When String is invalid', () => {
			Object.keys(datoFalsoSoloEnLosString).forEach(filed => {
				it(`Should return 400 ${filed} is invalid`, async () => {
					sandbox.stub(ProductosModel.prototype, 'insert');
					const req = mockRequest({ ...datoFalso, [filed]: 5 });
					const res = mockResponse();
					await handler(req, res);
					assert.deepStrictEqual(res.status, 400);
					assert.deepStrictEqual(res.json, { error: `"${filed}" must be a string` });
					sandbox.assert.notCalled(ProductosModel.prototype.insert);
				});
			});
		});
		context('When Number is invalid', () => {
			it('Should return 400 ibu is invalid', async () => {
				sandbox.stub(ProductosModel.prototype, 'insert');
				const req = mockRequest({ ...datoFalso, ibu: datoFalsoSoloEnLosNumero[0] });
				const res = mockResponse();
				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"ibu" must be a number' });
				sandbox.assert.notCalled(ProductosModel.prototype.insert);
			});
			it('Should return 400 abv is invalid', async () => {
				sandbox.stub(ProductosModel.prototype, 'insert');
				const req = mockRequest({ ...datoFalso, abv: datoFalsoSoloEnLosNumero[1] });
				const res = mockResponse();
				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"abv" must be a number' });
				sandbox.assert.notCalled(ProductosModel.prototype.insert);
			});
			it('Should return 400 price is invalid', async () => {
				sandbox.stub(ProductosModel.prototype, 'insert');
				const req = mockRequest({ ...datoFalso, price: datoFalsoSoloEnLosNumero[2] });
				const res = mockResponse();
				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"price" must be a number' });
				sandbox.assert.notCalled(ProductosModel.prototype.insert);
			});
			context('When Boolean is invalid', () => {
				it('Should return 400 isVisible is invalid', async () => {
					sandbox.stub(ProductosModel.prototype, 'insert');
					const req = mockRequest({ ...datoFalso, isVisible: datoFalsoSoloEnLosBoolean[1] });
					const res = mockResponse();
					await handler(req, res);
					assert.deepStrictEqual(res.status, 400);
					assert.deepStrictEqual(res.json, { error: '"isVisible" must be a boolean' });
					sandbox.assert.notCalled(ProductosModel.prototype.insert);
				});
				it('Should return 400 inStock is invalid', async () => {
					sandbox.stub(ProductosModel.prototype, 'insert');
					const req = mockRequest({ ...datoFalso, inStock: datoFalsoSoloEnLosBoolean[0] });
					const res = mockResponse();
					await handler(req, res);
					assert.deepStrictEqual(res.status, 400);
					assert.deepStrictEqual(res.json, { error: '"inStock" must be a boolean' });
					sandbox.assert.notCalled(ProductosModel.prototype.insert);
				});
			});
			context('When launch date is invalid', () => {
				it('Should return 400 launchDate is invalid', async () => {
					sandbox.stub(ProductosModel.prototype, 'insert');
					const req = mockRequest({ ...datoFalso, launchDate: 12 });
					const res = mockResponse();
					await handler(req, res);
					assert.deepStrictEqual(res.status, 400);
					assert.deepStrictEqual(res.json, { error: '"launchDate" must be a string' });
					sandbox.assert.notCalled(ProductosModel.prototype.insert);
				});
			});
		});
		context('When occures error in insert', () => {
			it('Should return 500 if method insert fails', async () => {
				sandbox.stub(ProductosModel.prototype, 'insert').rejects(new Error('Error in insert'));
				const req = mockRequest(datoFalso);
				const res = mockResponse();
				await handler(req, res);
				assert.deepStrictEqual(res.status, 500);
				assert.deepStrictEqual(res.json, { message: 'Error: Error in insert' });
				sandbox.assert.calledOnceWithExactly(ProductosModel.prototype.insert);
			});
		});
	});
});
