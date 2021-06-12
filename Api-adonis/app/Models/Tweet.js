"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Tweet extends Model {
	User() {
		return this.belongsTo("App/Models/User"); // definindo relacionamento de Tweet com User
	}
}

module.exports = Tweet;
