const express = require('express');
const CarritoModel = require('../../../models/Carrito');
const schemaId = require('../../../structures/validate-object-id');

const app = express.Router();

const handler = async (req, res) => {
	try {
		const { carritoId } = req.params;
		const validateSchema = await schemaId(carritoId);
		if(validateSchema.error)
			return res.status(400).json(validateSchema);

		const getCarrito = await CarritoModel.getById(carritoId);
		if(!getCarrito)
			return res.status(404).json({ message: `No se encontro el Carrito con el id ${carritoId}` });

		res.status(200).json({ Carrito: getCarrito });
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.get('/:carritoId', handler);
module.exports = { app, handler };
