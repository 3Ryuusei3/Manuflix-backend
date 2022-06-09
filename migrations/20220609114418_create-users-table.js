/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", (tbl) => {
		tbl.increments(); // id column
		tbl.text("username", 120).notNullable().unique().index();
		tbl.text("email", 120).notNullable().unique();
		tbl.text("password").notNullable();
		tbl.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
