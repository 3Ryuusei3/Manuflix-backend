/* const knex = require("knex");
const config = require("./knexfile");
const db = knex(config.development); */

const db = require("./dbConfig");

async function addUser(user) {
	/* await db("users").insert(user);
    return db("users").where({ username: user.username }); */
	return await db("users").insert(user, ["id", "username", "email"]);
}

function getAllUsers() {
	return db("users");
}

function findUserByUsername(username) {
	return db("users").where({ username: username }).first();
}

function findUserByEmail(email) {
	return db("users").where({ email: email }).first();
}

function removeUser(id) {
	return db("users").where({ id: id }).del();
}

module.exports = {
	addUser,
	getAllUsers,
	findUserByUsername,
	findUserByEmail,
	removeUser,
};
