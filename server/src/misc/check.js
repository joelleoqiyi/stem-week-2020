import {easyKey, difficultKey} from './config';

function cookieChecker(stageType, clientCookies, question) {

  let modelKeyValue = (stageType === 1) ? easyKey : difficultKey;
    //in this case a shallow copy would do since structure not complex
  let modelKeys = Object.keys(modelKeyValue);
  let sortedClientCookies = {};
  let lastKey = null;
  let tamperedKeys = [];
  Object.keys(clientCookies).sort().forEach(function(key) {
    sortedClientCookies[key] = clientCookies[key];
  });
  let clientCookieKeys = Object.keys(sortedClientCookies);
  if (clientCookieKeys.length > Number(question)){
    tamperedKeys = clientCookieKeys.splice(Number(question), clientCookieKeys.length);
    for (let deleteCookieKey of tamperedKeys){
      delete sortedClientCookies[deleteCookieKey];
    }
  }
  for (let indivKey of modelKeys){
    if (sortedClientCookies[indivKey] && sortedClientCookies[indivKey] === modelKeyValue[indivKey]){
      lastKey = indivKey;
    } else {
      if (lastKey === modelKeys[question-1]){
        return [[], null];
      } else {
        let lastNonTamperedKey = clientCookieKeys.indexOf(lastKey);
        clientCookieKeys.splice(lastNonTamperedKey+1, clientCookieKeys.length).forEach(function(key){
          if (tamperedKeys.indexOf(key) === -1){
            tamperedKeys.push(key);
          }
        })
        return [tamperedKeys, lastNonTamperedKey];
      }
    }
  }
}

export {cookieChecker};
