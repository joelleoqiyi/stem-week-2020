import {easyKey, difficultKey} from './config';

function cookieChecker(stageType, clientCookies, question) {

  let modelKeyValue = (stageType === 1) ? easyKey : difficultKey;
    //in this case a shallow copy would do since structure not complex
  let modelKeys = Object.keys(modelKeyValue);
  let sortedClientCookies = {};
  let lastKey = "";
  console.log(lastKey, sortedClientCookies, clientCookies, modelKeys, modelKeyValue)
  Object.keys(clientCookies).sort().forEach(function(key) {
    sortedClientCookies[key] = clientCookies[key];
  });
  let clientCookieKeys = Object.keys(sortedClientCookies);
  for (let indivKey of modelKeys){
    console.log(indivKey);
    if (sortedClientCookies[indivKey] && sortedClientCookies[indivKey] === modelKeyValue[indivKey]){
      lastKey = indivKey;
    } else {
      if (lastKey === modelKeys[question]){
        return [];
      } else {
        let lastNonTemperedKey = clientCookieKeys.indexOf(lastKey);
        let tamperedKeys = clientCookieKeys.splice(lastNonTemperedKey+1, clientCookieKeys.length);
        return tamperedKeys;
      }
    }
  }
}

export {cookieChecker};
