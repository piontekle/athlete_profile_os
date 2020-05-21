const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require("cors");

const routes = require('./api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(cors());

// get routes and serve static files
app.get('/', function(req, res) {
  res.send("Hello World!");
});

module.exports = app;
