"use strict";

var port = 4000;

var express = require("express");

var cors = require("cors");

var router = express.Router();

var projectRouter = require('./projects/projectRouter');

var actionRouter = require('./actions/actionRouter');

var welcomeRoute = require('./welcome/welcomeRoute');

var projects = require("./data/helpers/projectModel");

var server = express();
server.use(express.json());
server.use(cors());
server.use('/api/', welcomeRoute);
server.use('/api/projects', projectRouter);
server.use('/api/projects', actionRouter);
server.listen(port, function () {
  return console.log("API running on port ".concat(port));
});