const sandbox = require('sinon').createSandbox();
const assert = require('assert');

const ProductoModule = require('../../../src/models/Producto');
const { mockRequest, mockResponse } = require('../../mocks');
const { handler } = require('../../../src/routes/productos/src/update');

describe('handler Product Test', () => {
	afterEach(() => sandbox.restore());

	const fakeProductHandler = {
		lastErrorObject: { n: 1, handlerdExisting: true },
		value: {
			_id: '62502ac5d8e2121cf84e8267',
			name: 'honey',
			description: '',
			imageUrl: 'hola',
			brandName: 'quilmes',
			attributes: {
				ibu: 5,
				abv: 3,
				style: 'amarga'
			},
			price: 100,
			inStock: true,
			isVisible: false,
			launchDate: ''
		}
	};
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
	const fakeBody = {
		name: 'blackP',
		description: 'ricona',
		imageUrl: 'imagen.png',
		brandName: 'jeje',
		style: 'iPA',
		ibu: 1,
		abv: 1,
		price: 100,
		inStock: true,
		isVisible: false,
		launchDate: '2022/03/23'
	};
	const equalsProductoHandler = {
		lastErrorObject: { n: 1, handlerdExisting: true },
		value: {
			_id: '62502ac5d8e2121cf84e8267',
			name: 'honey',
			description: '',
			imageUrl: 'hola',
			brandName: 'quilmes',
			attributes: { ibu: 5, abv: 4, style: 'amarga' },
			price: 100,
			inStock: true,
			isVisible: true,
			launchDate: 11042022
		}
	};
	const equalsData = {
		name: 'honey',
		description: '',
		imageUrl: 'hola',
		brandName: 'quilmes',
		attributes: { ibu: 5, abv: 4, style: 'amarga' },
		price: 100,
		inStock: true,
		isVisible: true,
		launchDate: 11042022
	};
	const equalsBody = {
		name: 'honey',
		description: '',
		imageUrl: 'hola',
		brandName: 'quilmes',
		ibu: 5,
		abv: 4,
		style: 'amarga',
		price: 100,
		inStock: true,
		isVisible: true,
		launchDate: 11042022
	};
	const wrongBody = {
		name: true,
		description: true,
		imageUrl: true,
		brandName: true,
		price: true,
		inStock: 10,
		isVisible: 10
	};
	const fakedata2 = null;
	const productoId = '62502ac5d8e2121cf84e8267';
	const { style, ibu, abv, ...productoSinAtributos } = fakeBody;
	const formatoProductoCuerpo = {
		...productoSinAtributos,
		attributes: { ibu, abv, style },
		...fakeBody.lauchDate && { lauchDate: new Date(fakeBody.lauchDate) }
	};

	const { name } = wrongBody;
	const { description } = wrongBody;
	const { imageUrl } = wrongBody;
	const { brandName } = wrongBody;
	const { price } = wrongBody;
	const { inStock } = wrongBody;
	const { isVisible } = wrongBody;

	context('When no error occurs', () => {
		it('Should 200 if change is ok', async () => {
			sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

			const req = mockRequest(fakeBody, { productoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { productoUpdate: productoId });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productoId);
			sandbox.assert.calledOnceWithExactly(ProductoModule.findOneAndModify, productoId, formatoProductoCuerpo);
		});

		it('Should 200 if change is not needed', async () => {
			sandbox.stub(ProductoModule, 'findOneAndModify').resolves(equalsProductoHandler);
			sandbox.stub(ProductoModule, 'getById').resolves(equalsData);

			const req = mockRequest(equalsBody, { productoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			assert.deepStrictEqual(res.json, { message: 'Sin cambios' });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productoId);
			sandbox.assert.notCalled(ProductoModule.findOneAndModify);
		});

	});
	context('When error occurs', () => {
		it('Should return 404 if User not found', async () => {
			sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata2);

			const req = mockRequest(fakeBody, { productoId });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 404);
			assert.deepStrictEqual(res.json, { message: `No se encontro el producto con el id ${productoId}` });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productoId);
			sandbox.assert.notCalled(ProductoModule.findOneAndModify);
		});

		it('Should return 400 if validate ObjectId wrong', async () => {
			sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata2);

			const req = mockRequest(fakeBody);
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"value" is required' });

			sandbox.assert.notCalled(ProductoModule.getById);
			sandbox.assert.notCalled(ProductoModule.findOneAndModify);
		});

		context('When String is invalid', () => {

			it('Should return 400 if name is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ name }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"name" must be a string' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if description is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ description }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"description" must be a string' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if imageUrl is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ imageUrl }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"imageUrl" must be a string' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if brandName is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ brandName }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"brandName" must be a string' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if style is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ style: 10 }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"style" must be a string' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});
		});

		context('When Number is invalid', () => {
			it('Should return 400 if ibu is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ ibu: true }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"ibu" must be a number' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if abv is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ abv: true }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"abv" must be a number' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if price is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ price }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"price" must be a number' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});
		});

		context('When Boolean is invalid', () => {
			it('Should return 400 if isVisible is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ isVisible }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"isVisible" must be a boolean' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});

			it('Should return 400 if inStock is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ inStock }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"inStock" must be a boolean' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});
		});

		context('When launchDate is invalid', () => {
			it('Should return 400 if Launch Date is invalid', async () => {
				sandbox.stub(ProductoModule, 'findOneAndModify').resolves(fakeProductHandler);
				sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

				const req = mockRequest({ launchDate: 'hola' }, { productoId });
				const res = mockResponse();

				await handler(req, res);
				assert.deepStrictEqual(res.status, 400);
				assert.deepStrictEqual(res.json, { error: '"launchDate" must be a valid date' });

				sandbox.assert.notCalled(ProductoModule.getById);
				sandbox.assert.notCalled(ProductoModule.findOneAndModify);
			});
		});

		it('Should return 500 if method database fails', async () => {
			sandbox.stub(ProductoModule, 'findOneAndModify').rejects(new Error('Error in database'));
			sandbox.stub(ProductoModule, 'getById').resolves(fakedata);

			const req = mockRequest(fakeBody, { productoId });
			const res = mockResponse();

			await handler(req, res);

			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in database' });

			sandbox.assert.calledOnceWithExactly(ProductoModule.getById, productoId);
			sandbox.assert.calledOnceWithExactly(ProductoModule.findOneAndModify, productoId, formatoProductoCuerpo);
		});
	});
});
