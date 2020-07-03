//importing neccessary functions from other supporting files
import 'babel-polyfill'; //to allow babel to transpile async/await
import {dataPro} from './route/easyStage'

//declaring variables, npm packages
const assert = require("assert");
const bodyParser = require('body-parser');
const express = require("express");
const port = process.env.PORT || 3000;

//initialising server and socket.io connection
const app = express();
const cors = require("cors");
const http = require("http").createServer(app)

//setting up server "settings"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/testPicture', dataPro);
http.listen(port, () => {
  console.log(`listening to port ${port}`)
});
