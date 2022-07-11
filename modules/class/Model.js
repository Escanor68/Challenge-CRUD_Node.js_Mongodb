const mongodb = require('mongodb');
const Mongo = require('../database/Mongo');

const mongo = new Mongo();

module.exports = class Model {

	static get collection() {
		return 'default';
	}

	get collection() {
		return 'default';
	}

	static get statuses() {
		return {
			active: 'active',
			inactive: 'inactive'
		};
	}

	async insert() {

		const db = await mongo.connect();

		try {
			return db.collection(this.collection).insertOne(this);
		} catch(error) {
			return error.message;
		}
	}

	static async getById(id) {
		const db = await mongo.connect();
		const parser = mongodb.ObjectId(id);
		try {
			return db.collection(this.collection).findOne({ _id: parser });
		} catch(error) {
			return error.message;
		}
	}

	static async get(filterQuery, orden) {
		const db = await mongo.connect();
		try {
			return db.collection(this.collection).find(filterQuery).sort(orden).toArray();
		} catch(error) {
			return error.message;
		}
	}

	static async findOneAndModify(id, data) {
		const db = await mongo.connect();
		const parser = mongodb.ObjectId(id);
		try {
			return db.collection(this.collection).findOneAndUpdate({ _id: parser }, { $set: data }, { new: true });
		} catch(error) {
			return error.message;
		}
	}
};
