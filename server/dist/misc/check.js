"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookieChecker = cookieChecker;

var _config = require("./config");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function cookieChecker(stageType, clientCookies, question) {
  var modelKeyValue = stageType === 1 ? _config.easyKey : _config.difficultKey; //in this case a shallow copy would do since structure not complex

  var modelKeys = Object.keys(modelKeyValue);
  var sortedClientCookies = {};
  var lastKey = null;
  var tamperedKeys = [];
  Object.keys(clientCookies).sort().forEach(function (key) {
    sortedClientCookies[key] = clientCookies[key];
  });
  var clientCookieKeys = Object.keys(sortedClientCookies);

  if (clientCookieKeys.length > Number(question) - 1) {
    tamperedKeys = clientCookieKeys.splice(Number(question), clientCookieKeys.length);
  }

  var _iterator = _createForOfIteratorHelper(tamperedKeys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var deleteCookieKey = _step.value;
      delete sortedClientCookies[deleteCookieKey];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (var _i = 0, _modelKeys = modelKeys; _i < _modelKeys.length; _i++) {
    var indivKey = _modelKeys[_i];

    if (sortedClientCookies[indivKey] && sortedClientCookies[indivKey] === modelKeyValue[indivKey]) {
      lastKey = indivKey;
    } else {
      if (lastKey === modelKeys[question - 1]) {
        return [];
      } else {
        var lastNonTemperedKey = clientCookieKeys.indexOf(lastKey);
        clientCookieKeys.splice(lastNonTemperedKey + 1, clientCookieKeys.length).forEach(function (key) {
          if (temperedKeys.indexOf(key) === -1) {
            temperedKeys.push(key);
          }
        });
        return [tamperedKeys, lastNonTemperedKey];
      }
    }
  }
}