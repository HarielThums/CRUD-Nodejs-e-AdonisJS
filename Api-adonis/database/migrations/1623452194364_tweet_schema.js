"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TweetSchema extends Schema {
	up() {
		this.create("tweets", (table) => {
			table.increments();

			table
				.integer("user_id")
				.unsigned() // proibe valor menor que 0
				.notNullable()
				.references("id") // campo da tabela que é usado pra referencia
				.inTable("users") // tabela que é usada para referencia
				.onUpdate("CASCADE") // ação que acontece se a referencia sofrer update
				.onDelete("CASCADE"); // ação que acontece se a referencia for deletada

			table.string("content", 240).notNullable();
			table.timestamps();
		});
	}

	down() {
		this.drop("tweets");
	}
}

module.exports = TweetSchema;
