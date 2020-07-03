"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataPro = void 0;

//declaring variables, npm packages
var express = require('express');

var dataPro = express.Router();
exports.dataPro = dataPro;

var cors = require('cors'); //setting up CORS settings


var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
dataPro.use(function timeLog(req, res, next) {
  console.log("(NEW) user!");
  next();
});
dataPro.post('/', cors(), function (req, res) {
  /*
  let username, password, userToken;
  if (req.body.username !== undefined && req.body.password !== undefined && req.body.userToken !== undefined) {
  */
  res.sendFile(__dirname + '/test.png'); //res.cookie('email', "cyx", { maxAge: 900000, httpOnly: true });
  //res.send("hello world!")
});