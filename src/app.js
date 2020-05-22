require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const dbInit = require("./config/db-config");
const routes = require('./api');
const frontendFolder = path.join(__dirname, "..", "public");

dbInit();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// get routes and serve static files
routes.init(app);
app.get('/', function (req, res) {
	res.sendFile(frontendFolder);
});
app.use(express.static(frontendFolder))

module.exports = app;
