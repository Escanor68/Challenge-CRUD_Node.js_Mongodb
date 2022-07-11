const express = require('express');
const ProductoModule = require('../../../models/Producto');
const schemaId = require('../../../structures/validate-object-id');

const app = express.Router();

const handler = async (req, res) => {
	const { productId } = req.params;
	try {
		const validateObjetoId = await schemaId(productId);
		if(validateObjetoId.error)
			return res.status(400).json(validateObjetoId);

		const getProductoById = await ProductoModule.getById(productId);
		if(!getProductoById)
			return res.status(404).json({ message: `No se encontro el producto con el id ${productId}` });

		res.status(200).json({ Producto: getProductoById });
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.get('/:productId', handler);
module.exports = { app, handler };
