"use strict";

require("babel-polyfill");

var _easyStage = require("./route/easyStage");

//importing neccessary functions from other supporting files
//to allow babel to transpile async/await
//declaring variables, npm packages
var assert = require("assert");

var bodyParser = require('body-parser');

var express = require("express");

var port = process.env.PORT || 3000; //initialising server and socket.io connection

var app = express();

var cors = require("cors");

var http = require("http").createServer(app); //setting up server "settings"


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/helloworld', _easyStage.dataPro);
http.listen(port, function () {
  console.log("listening to port ".concat(port));
});