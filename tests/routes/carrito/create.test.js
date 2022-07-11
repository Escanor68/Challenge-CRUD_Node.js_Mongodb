const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const { mockRequest, mockResponse } = require('../../mocks');

const { handler } = require('../../../src/routes/carrito/src/create');
const CarritoModel = require('../../../src/models/Carrito');

describe('Create cart api Test', () => {
	afterEach(() => sandbox.restore());

	const datoFalso = { email: 'john.doe@example.com' };
	const falsoId = {
		CarritoId: {
			acknowledged: true,
			insertedId: '6261bacd945959852aeecd0a'
		}
	};

	context('When no error occurs', () => {
		it('Should return 200 if create product is successful', async () => {
			sandbox.stub(CarritoModel.prototype, 'insert').resolves(falsoId);
			const req = mockRequest(datoFalso);
			const res = mockResponse();
			await handler(req, res);
			assert.deepStrictEqual(res.status, 200);
			sandbox.assert.calledOnceWithExactly(CarritoModel.prototype.insert);
		});
	});

	context('When error occurs', () => {
		it('Should return 400 if invalid data', async () => {
			sandbox.stub(CarritoModel.prototype, 'insert');

			const req = mockRequest({ ...datoFalso, email: true });
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 400);
			assert.deepStrictEqual(res.json, { error: '"email" must be a string' });

			sandbox.assert.notCalled(CarritoModel.prototype.insert);
		});

		it('Should return 500 if method insert fails', async () => {
			sandbox.stub(CarritoModel.prototype, 'insert').rejects(new Error('Error in insert'));

			const req = mockRequest(datoFalso);
			const res = mockResponse();

			await handler(req, res);
			assert.deepStrictEqual(res.status, 500);
			assert.deepStrictEqual(res.json, { message: 'Error: Error in insert' });

			sandbox.assert.calledOnceWithExactly(CarritoModel.prototype.insert);
		});
	});
});
