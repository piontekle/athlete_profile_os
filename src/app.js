require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const dbInit = require("./config/db-config");
const routes = require('./api');

dbInit();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// get routes and serve static files
routes.init(app);
app.get('/', function (req, res) {
	res.sendFile("./public/index.html");
});

module.exports = app;
