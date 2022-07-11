const express = require('express');
const ProductoModel = require('../../../models/Producto');
const schemaCreate = require('../../../structures/producto/create');

const app = express.Router();

const handler = async (req, res) => {
	const validation = await schemaCreate(req.body);
	if(validation.error)
		return res.status(400).json(validation);
	const producto = new ProductoModel(req.body);

	try {
		const productosInsertId = await producto.insert();
		res.status(200).json({ insertId: productosInsertId });
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.post('/', handler);
module.exports = { app, handler };
