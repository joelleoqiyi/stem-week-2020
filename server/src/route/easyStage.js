//declaring variables, npm packages
var express = require('express')
var easyStage = express.Router()
var cors = require('cors')

//setting up CORS settings
var whitelist = ['http://localhost:1234', "https://serenesmartlava--20y5c35liu.repl.co", "https://stem--rea123.repl.co/"];
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
easyStage.post('/', cors(corsOptions), function (req, res) {
  /*
  let username, password, userToken;
  if (req.body.username !== undefined && req.body.password !== undefined && req.body.userToken !== undefined) {
  */
  console.log(req.body);
  res.cookie('key', "cyx", {maxAge: 604800000, httpOnly: true, domain: ".stem-week-cipher.herokuapp.com"}); //expires: false, secure: true,httpOnly: true,
  res.sendFile(__dirname + '/test.png');
  //res.cookie('email', "cyx", { maxAge: 900000, httpOnly: true });
  //res.send("hello world!")
})

export {easyStage}
