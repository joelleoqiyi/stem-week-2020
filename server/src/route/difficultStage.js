//declaring variables, npm packages
var express = require('express')
var difficultStage = express.Router()
var cors = require('cors')
import {easyKey, whitelistURL}  from '../misc/config'


//setting up CORS settings
var whitelist = whitelistURL;
console.log(whitelist, typeof whitelist)
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("it works!")
      callback(null, true)
    } else {
      console.log("something failed?")
      callback(new Error('Not allowed by CORS'))
    }
  },
  'credentials': true
}

difficultStage.use(function timeLog (req, res, next) {
  console.log(`\(NEW\) user!`)
  console.log(corsOptions)
  next()
})

difficultStage.options("*", cors(corsOptions))
difficultStage.post('/', cors(corsOptions), function (req, res) {
  /*
  let username, password, userToken;
  if (req.body.username !== undefined && req.body.password !== undefined && req.body.userToken !== undefined) {
  */
  //res.sendFile(__dirname + '/test.png');
  //
  //res.send("hello world!")
  /*if (req.body.answer && req.body.answer === "something"){

  } */
  console.log(req.cookies);
  console.log(easyKey, typeof easyKey);
  console.log(req.body);
  if (req.cookies.key === "cyx"){
    test = ["lol", "lol1"]
    for (i of test){
      res.cookie(i, "cyx", {maxAge: 604800000, httpOnly: true, domain:".stem-week-cipher.herokuapp.com" }); //expires: false,, secure: true,httpOnly: true
    }

    res.send({
      "status": "pass",
      "payload": {
        "url": "https://google.com"
      }
    })
  } else {
    res.end("wrong key")
  }

})

export {difficultStage}
