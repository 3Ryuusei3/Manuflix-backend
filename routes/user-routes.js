const express = require("express");
const bcrypt = require("bcryptjs");
const Manuflix = require("../dbHelpers");

const router = express.Router();

router.get("/users", (req, res) => {
	Manuflix.getAllUsers()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(500).json({ message: "Cannot get the users" });
		});
});

router.post("/signup", (req, res) => {
	const credentials = req.body;
	const { username, email, password } = credentials;
	if (!(username && email && password)) {
		return res.status(404).json({ message: "Username, email and password required" });
	}

	const hash = bcrypt.hashSync(credentials.password, 12);
	credentials.password = hash;

	Manuflix.addUser(credentials)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	Manuflix.findUserByEmail(email, password)
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: "User does no exist" });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.get("/users/:username", (req, res) => {
	const { username } = req.params;
	Manuflix.findUserByUsername(username)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(400).json({ message: "User does no exist" });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

router.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	Manuflix.removeUser(id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: "User is deleted" });
			} else {
				res.status(404).json({ message: "No user with that id" });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = router;
