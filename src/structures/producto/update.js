const Joi = require('joi');

const validateSchema = require('../validateSchema');

module.exports = body => {

	const schema = Joi.object({
		name: Joi.string(),
		description: Joi.string().allow(''),
		imageUrl: Joi.string(),
		brandName: Joi.string(),
		style: Joi.string(),
		ibu: Joi.number(),
		abv: Joi.number(),
		price: Joi.number(),
		inStock: Joi.boolean(),
		isVisible: Joi.boolean().optional(),
		launchDate: Joi.date()
	});

	return validateSchema(schema, body);
};
