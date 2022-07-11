const express = require('express');
const CarritoModel = require('../../../models/Carrito');
const ProdcutoModel = require('../../../models/Producto');
const schemaAdded = require('../../../structures/carrito/added');
const schemaId = require('../../../structures/validate-object-id');

const app = express.Router();

const handler = async (req, res) => {
	try {
		const { carritoId } = req.params;
		const validationBody = await schemaAdded(req.body);
		if(validationBody.error)
			return res.status(400).json(validationBody);

		const validationId = await schemaId(carritoId);
		if(validationId.error)
			return res.status(400).json(validationId);

		// destructuro lo que me llega del body
		const { quantity, id } = req.body;

		// valido que exitsta el carrito
		const getCarritoById = await CarritoModel.getById(carritoId);
		if(!getCarritoById)
			return res.status(404).json({ message: `No se encontro un carrito con el id ${carritoId}` });
		// valido que exitsta el producto
		const getProductoById = await ProdcutoModel.getById(id);
		if(!getProductoById)
			return res.status(404).json({ message: `No se encontro el producto con el id ${id}` });
		// si no existe lo agregamos al carrito
		const carritoConProducto = getCarritoById.items.length ? getCarritoById.items.find(product => product.id === id) : false;
		if(!carritoConProducto) {
			const producto = {
				id,
				name: getProductoById.name,
				imageUrl: getProductoById.imageUrl,
				quantity,
				price: getProductoById.price
			};
			getCarritoById.items.push(producto);
		} else {
			// si el producto ya se encuentra entonces le sumo la cantidad
			carritoConProducto.quantity += quantity;
		}
		await CarritoModel.findOneAndModify(carritoId, getCarritoById);
		return res.status(200).json({
			Carrito: carritoId,
			producto: id,
			quantity: carritoConProducto ? carritoConProducto.quantity : quantity
		});
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.put('/:carritoId/items', handler);
module.exports = { app, handler };
