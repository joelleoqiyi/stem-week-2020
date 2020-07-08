"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easyStage = void 0;

var _config = require("../misc/config");

var _check = require("../misc/check");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//declaring variables, npm packages
var express = require('express');

var easyStage = express.Router();
exports.easyStage = easyStage;

var cors = require('cors'); //setting up CORS settings


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
easyStage.use(function timeLog(req, res, next) {
  console.log("(NEW) user!");
  next();
});
easyStage.options("*", cors(corsOptions));
easyStage.post('/check', cors(corsOptions), function (req, res) {
  if (req.body) {
    var questionNumber = Number(req.body.qn) > -1 && Number(req.body.qn) < 8 ? Number(req.body.qn) : null;
    var clientAnswer = req.body.answer ? String(req.body.answer).trim().toLowerCase() : null;
    var temperedKeys = [];
    var lastNonTemperedKey = null;

    if (questionNumber !== null && clientAnswer) {
      console.log("(NEW) user submitting to EASY:".concat(questionNumber));

      if (req.cookies) {
        var _cookieChecker = (0, _check.cookieChecker)(1, req.cookies, Number(questionNumber));

        var _cookieChecker2 = _slicedToArray(_cookieChecker, 2);

        temperedKeys = _cookieChecker2[0];
        lastNonTemperedKey = _cookieChecker2[1];
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
        if (String(clientAnswer) === String(_config.easyStageAnswers[questionNumber].answer)) {
          res.cookie(_config.easyStageAnswers[questionNumber].keyName, _config.easyStageAnswers[questionNumber].keyGiven, {
            maxAge: 604800000,
            httpOnly: true,
            domain: ".stem-week-cipher.herokuapp.com",
            path: "/easy"
          }); //expires: false, secure: true,httpOnly: true,

          res.send({
            "status": "pass",
            "message": "Well done! Let's move on to the next question!"
          });
          return;
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
            res.clearCookie(String(temperedIndivKey), {
              httpOnly: true,
              domain: ".stem-week-cipher.herokuapp.com",
              path: "/easy"
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        res.send({
          "status": "fail",
          "errorMessage": "Cookie tempering detected.",
          "returnQn": lastNonTemperedKey !== null ? _config.easyStageAnswers[Number(lastNonTemperedKey) + 1]["url"] : _config.easyStageAnswers[0]["url"]
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