"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.difficultStage = void 0;

var _config = require("../misc/config");

var _check = require("../misc/check");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//declaring variables, npm packages
var express = require('express');

var difficultStage = express.Router();
exports.difficultStage = difficultStage;

var cors = require('cors');

var path = require('path'); //setting up CORS settings


var whitelist = _config.whitelistURL;
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  'preflightContinue': true,
  'credentials': true
};
difficultStage.use(function timeLog(req, res, next) {
  console.log("(NEW) user!");
  next();
});
difficultStage.options("*", cors(corsOptions));
difficultStage.post('/check', cors(corsOptions), function (req, res) {
  if (req.body) {
    var questionNumber = Number(req.body.qn) > -1 && Number(req.body.qn) < 9 ? Number(req.body.qn) : null;
    var clientAnswer = req.body.answer ? String(req.body.answer) : null;
    var temperedKeys = [];

    if (questionNumber !== null && clientAnswer) {
      console.log("(NEW) user submitting to DIFFICULT:".concat(questionNumber));

      if (res.cookies) {
        temperedKeys = (0, _check.cookieChecker)(0, res.cookies, Number(questionNumber));
      } else {
        //only accept if first time
        if (questionNumber === 0) {
          temperedKeys === [];
        } else {
          res.send({
            "status": "fail",
            "errorMessage": "Empty Cookie"
          });
          return;
        }
      }

      if (Array.isArray(temperedKeys) === true && temperedKeys.length === 0) {
        if (String(clientAnswer) === String(_config.difficultStageAnswers[questionNumber].answer)) {
          res.cookie(_config.difficultStageAnswers[questionNumber].keyName, _config.difficultStageAnswers[questionNumber].keyGiven, {
            maxAge: 604800000,
            httpOnly: true,
            domain: ".localhost:3000"
          }); //expires: false, secure: true,httpOnly: true,

          if (questionNumber < 5) {
            //special case of pictures. will hardcode this time :(
            res.sendFile(path.join(__dirname, '../public', _config.difficultStageAnswers[questionNumber].imageGiven));
            return;
          } else {
            res.send({
              "status": "pass",
              "message": "Well done! Let's move on to the next question!"
            });
            return;
          }
        } else {
          res.send({
            "status": "fail",
            "errorMessage": "Wrong Answer! Please Try again!"
          });
        }
      } else {
        var _iterator = _createForOfIteratorHelper(temperedKeys),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var temperedIndivKey = _step.value;
            res.clearCookie(String(temperedIndivKey));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        res.send({
          "status": "fail",
          "errorMessage": "Cookie tempering detected."
        });
        return;
      }
    } else {
      res.send({
        "status": "fail",
        "errorMessage": "Missing Argument!"
      });
      return;
    }
  } else {
    res.send({
      "status": "fail",
      "errorMessage": "Request Body is Empty!"
    });
    return;
  }
});