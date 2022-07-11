const express = require('express');
const CarritoModel = require('../../../models/Carrito');
const schemaCreate = require('../../../structures/carrito/create');

const app = express.Router();

const handler = async (req, res) => {
	try {
		const validation = await schemaCreate(req.body);

		if(validation.error)
			return res.status(400).json(validation);

		const carrito = new CarritoModel(req.body);
		const carritoInsertId = await carrito.insert();

		res.status(200).json({ CarritoId: carritoInsertId });
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.post('/', handler);
module.exports = { app, handler };
