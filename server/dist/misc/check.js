"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookieChecker = cookieChecker;

var _config = require("./config");

function cookieChecker(stageType, clientCookies, question) {
  var modelKeyValue = stageType === 1 ? _config.easyKey : _config.difficultKey; //in this case a shallow copy would do since structure not complex

  var modelKeys = Object.keys(modelKeyValue);
  var sortedClientCookies = {};
  var lastKey = "";
  console.log(lastKey, sortedClientCookies, clientCookies, modelKeys, modelKeyValue);
  Object.keys(clientCookies).sort().forEach(function (key) {
    sortedClientCookies[key] = clientCookies[key];
  });
  var clientCookieKeys = Object.keys(sortedClientCookies);

  for (var _i = 0, _modelKeys = modelKeys; _i < _modelKeys.length; _i++) {
    var indivKey = _modelKeys[_i];
    console.log(indivKey);

    if (sortedClientCookies[indivKey] && sortedClientCookies[indivKey] === modelKeyValue[indivKey]) {
      lastKey = indivKey;
    } else {
      if (lastKey === modelKeys[question]) {
        return [];
      } else {
        var lastNonTemperedKey = clientCookieKeys.indexOf(lastKey);
        var tamperedKeys = clientCookieKeys.splice(lastNonTemperedKey + 1, clientCookieKeys.length);
        return tamperedKeys;
      }
    }
  }
}