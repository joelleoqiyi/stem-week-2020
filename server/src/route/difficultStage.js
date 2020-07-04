//declaring variables, npm packages
var express = require('express')
var difficultStage = express.Router()
var cors = require('cors')

//setting up CORS settings
var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

difficultStage.use(function timeLog (req, res, next) {
  console.log(`\(NEW\) user!`)
  next()
})


difficultStage.post('/', cors(), function (req, res) {
  /*
  let username, password, userToken;
  if (req.body.username !== undefined && req.body.password !== undefined && req.body.userToken !== undefined) {
  */
  //res.sendFile(__dirname + '/test.png');
  //res.cookie('email', "cyx", { maxAge: 900000, httpOnly: true });
  //res.send("hello world!")
  /*if (req.body.answer && req.body.answer === "something"){

  } */
  console.log(req);
})

export {dataPro}
