require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));

// IMPORT ROUTERS

const usersRouter = require("./routes/user-routes");

// USE THE ROUTES

app.use("/", usersRouter);

// WELCOME MESSAGE PAGE

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the server" });
});

// PORT

app.listen(port, () => {
	console.log(`My server is running at port ${port}`);
});
