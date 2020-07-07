//import supporting files
import {whitelistURL, easyKey} from '../misc/config'

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

easyStage.post('/b25l', cors(corsOptions), function (req, res) {
  if (req.body) {
    let questionNumber = req.body.qn ? String(req.body.qn) : null;
    let answer = req.body.answer ? String(req.body.answer) : null;
    if (questionNumber && answer){
      
    } else {
      res.send(//show one of the values is empty);
    }
  } else {
    res.send(//show nth is given. )
  }
  console.log(req.body);
  res.cookie('key', "cyx", {maxAge: 604800000, httpOnly: true, domain: ".stem-week-cipher.herokuapp.com"}); //expires: false, secure: true,httpOnly: true,
  res.sendFile(__dirname + '/test.png');
  //res.cookie('email', "cyx", { maxAge: 900000, httpOnly: true });
  //res.send("hello world!")
})

export {easyStage}
