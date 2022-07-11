const express = require('express');
const areObjectsEquals = require('are-objects-equals');
const ProductoModule = require('../../../models/Producto');
const schemaUpdate = require('../../../structures/producto/update');
const schemaId = require('../../../structures/validate-object-id');

const app = express.Router();

const handler = async (req, res) => {
	const { productoId } = req.params;
	try {
		const [validateObjetoId, validate] = await Promise.all([schemaId(productoId), schemaUpdate(req.body)]);

		// validaciones
		if(validateObjetoId.error)
			return res.status(400).json(validateObjetoId);

		if(validate.error)
			return res.status(400).json(validate);

		const getProductoById = await ProductoModule.getById(productoId);
		if(!getProductoById)
			return res.status(404).json({ message: `No se encontro el producto con el id ${productoId}` });

		const { style, ibu, abv, ...productoConAtributos } = req.body;
		const formatoProductoCuerpo = {
			...productoConAtributos,
			attributes: { ibu, abv, style },
			...req.body.launchDate && { launchDate: new Date(req.body.launchDate) }
		};

		const { _id, ...productoConEstados } = getProductoById;
		if(areObjectsEquals(formatoProductoCuerpo, productoConEstados))
			return res.status(200).json({ message: 'Sin cambios' });

		// cambios a realizar
		const productoUpdate = await ProductoModule.findOneAndModify(productoId, formatoProductoCuerpo);
		res.status(200).json({ productoUpdate: productoUpdate.value._id });
	} catch(error) {
		return res.status(500).json({ message: error.toString() });
	}
};

app.use('/:productoId', handler);
module.exports = { app, handler };
