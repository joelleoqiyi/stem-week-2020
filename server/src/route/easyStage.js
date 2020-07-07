//import supporting files
import {whitelistURL, easyStageAnswers} from '../misc/config';
import {cookieChecker} from '../misc/check';

//declaring variables, npm packages
var express = require('express')
var easyStage = express.Router()
var cors = require('cors')

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

easyStage.use(function timeLog (req, res, next) {
  console.log(`\(NEW\) user!`)
  next()
})

easyStage.options("*", cors(corsOptions))

easyStage.post('/check', cors(corsOptions), function (req, res) {
  if (req.body) {
    let questionNumber = (Number(req.body.qn) > -1 && Number(req.body.qn) < 8) ? Number(req.body.qn) : null;
    let clientAnswer = req.body.answer ? String(req.body.answer) : null;
    let temperedKeys = [];
    let lastNonTemperedKey = null;
    if (questionNumber !== null && clientAnswer){
      console.log(`\(NEW\) user submitting to EASY:${questionNumber}`);
      if (req.cookies){
        [temperedKeys,lastNonTemperedKey] = cookieChecker(1, req.cookies, Number(questionNumber));
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
        if (String(clientAnswer) === String(easyStageAnswers[questionNumber].answer)){
          res.cookie(easyStageAnswers[questionNumber].keyName,
                     easyStageAnswers[questionNumber].keyGiven,
                     {maxAge: 604800000, httpOnly: true, domain: ".stem-week-cipher.herokuapp.com", path:"/easy"}
                    ); //expires: false, secure: true,httpOnly: true,
          res.send({
            "status": "pass",
            "message": "Well done! Let's move on to the next question!"
          });
          return;
        } else {
          res.send({
            "status": "fail",
            "errorMessage": "Wrong Answer! Please Try again!"
          })
        }
      } else {
        for (let temperedIndivKey of temperedKeys){
          res.clearCookie(String(temperedIndivKey),
                          {httpOnly: true, domain: ".stem-week-cipher.herokuapp.com", path:"/easy"}
                        );
        }
        res.send({
          "status": "fail",
          "errorMessage": "Cookie tempering detected.",
          "returnQn": easyStageAnswers[Number(lastNonTemperedKey)+1]["url"]
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

export {easyStage}
