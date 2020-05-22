require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const dbInit = require("./config/db-config");
//const routes = require('./api');
dbInit();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// get routes and serve static files
app.get('/', function (req, res) {
  res.send("Hello World!");
	//res.sendFile(path.join(__dirname, 'index.html'));
});
//
// app.use(express.static(__dirname));

module.exports = app;
