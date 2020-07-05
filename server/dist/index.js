"use strict";

require("babel-polyfill");

var _easyStage = require("./route/easyStage");

var _difficultStage = require("./route/difficultStage");

//importing neccessary functions from other supporting files
//to allow babel to transpile async/await
//declaring variables, npm packages
var assert = require("assert");

var bodyParser = require('body-parser');

var express = require("express");

var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser'); //initialising server and socket.io connection


var app = express();

var cors = require("cors");

var http = require("http").createServer(app); //setting up server "settings"


app.use(bodyParser.urlencoded({
  extended: true
}));
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use('/testPicture', _easyStage.easyStage);
app.use('/testAnswer', _difficultStage.difficultStage);
http.listen(port, function () {
  console.log("listening to port ".concat(port));
});