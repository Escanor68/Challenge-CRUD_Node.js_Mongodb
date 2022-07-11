const Joi = require('joi');

const validateSchema = require('../validateSchema');

module.exports = body => {

	const schema = Joi.object({
		brandName: Joi.string(),
		isVisible: Joi.boolean(),
		inStock: Joi.boolean(),
		order: Joi.string().valid('moreBitter', 'lessBitter', 'morePrice', 'lessPrice')
	});

	return validateSchema(schema, body);
};
