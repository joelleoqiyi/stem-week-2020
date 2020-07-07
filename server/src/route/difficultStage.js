//import supporting files
import {whitelistURL, difficultStageAnswers} from '../misc/config';
import {cookieChecker} from '../misc/check';

//declaring variables, npm packages
var express = require('express');
var difficultStage = express.Router();
var cors = require('cors');
var path = require('path');

//setting up CORS settings
var whitelist = whitelistURL;
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  'preflightContinue':true,
  'credentials': true
}

difficultStage.use(function timeLog (req, res, next) {
  console.log(`\(NEW\) user!`)
  next()
})

difficultStage.options("*", cors(corsOptions))

difficultStage.post('/check', cors(corsOptions), function (req, res) {
  if (req.body) {
    let questionNumber = (Number(req.body.qn) > -1 && Number(req.body.qn) < 9) ? Number(req.body.qn) : null;
    let clientAnswer = req.body.answer ? String(req.body.answer) : null;
    let temperedKeys = [];
    let lastNonTemperedKey = null;
    if (questionNumber !== null && clientAnswer){
      console.log(`\(NEW\) user submitting to DIFFICULT:${questionNumber}`);
      if (req.cookies){
        [temperedKeys,lastNonTemperedKey] = cookieChecker(0, req.cookies, Number(questionNumber));
      } else {
        //only accept if first time
        if (questionNumber === 0){
          temperedKeys === [];
        } else {
          res.send({
            "status": "fail",
            "errorMessage": "Empty Cookie"
          });
          return;
        }
      }
      if (Array.isArray(temperedKeys) === true && temperedKeys.length === 0){
        if (String(clientAnswer) === String(difficultStageAnswers[questionNumber].answer)){
          res.cookie(difficultStageAnswers[questionNumber].keyName,
                     difficultStageAnswers[questionNumber].keyGiven,
                     {maxAge: 604800000, httpOnly: true, domain: ".stem-week-cipher.herokuapp.com"}
                    ); //expires: false, secure: true,httpOnly: true,
          if (questionNumber < 5){ //special case of pictures. will hardcode this time :(
            res.sendFile(path.join(__dirname, '../public', difficultStageAnswers[questionNumber].imageGiven));
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
          })
        }
      } else {
        for (let temperedIndivKey of temperedKeys){
          res.clearCookie(String(temperedIndivKey));
        }
        res.send({
          "status": "fail",
          "errorMessage": "Cookie tempering detected.",
          "returnQn": difficultStageAnswers[Number(lastNonTemperedKey)+1].url
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
})

export {difficultStage}
