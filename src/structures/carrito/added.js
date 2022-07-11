const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validateSchema = require('../validateSchema');

module.exports = body => {

	const schema = Joi.object({
		id: Joi.objectId().required(),
		quantity: Joi.number().required()
	});

	return validateSchema(schema, body);
};
