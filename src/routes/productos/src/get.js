const express = require('express');
const ProductoModule = require('../../../models/Producto');
const schemaQuery = require('../../../structures/producto/get');

const app = express.Router();

const sort = {
	moreBitter: { ibu: -1 },
	lessBitter: { ibu: 1 },
	morePrice: { price: -1 },
	lessPrice: { price: 1 }
};

const handler = async (req, res) => {
	try {
		const validateSchema = await schemaQuery(req.query);
		if(validateSchema.error)
			return res.status(400).json(validateSchema);

		// si el filterQuery tiene el orden, eliminar y quedarme con el resto
		const filterQuery = {
			...req.query.brandName && { brandName: req.query.brandName },
			...req.query.isVisible && { isVisible: req.query.isVisible },
			...req.query.inStock && { inStock: req.query.inStock }
		};

		// si exite orden crear dentro de un objecto
		const sortQuery = req.query.order ? sort[req.query.order] : { };
		const getProducto = await ProductoModule.get(filterQuery, sortQuery);

		if(!getProducto)
			return res.status(200).json({ message: 'products empty' });

		res.status(200).json({ Productos: getProducto });
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.get('/', handler);
module.exports = { app, handler };
