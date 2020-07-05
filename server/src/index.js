//importing neccessary functions from other supporting files
import 'babel-polyfill'; //to allow babel to transpile async/await
import {easyStage} from './route/easyStage';
import {difficultStage} from './route/difficultStage'

//declaring variables, npm packages
const assert = require("assert");
const bodyParser = require('body-parser');
const express = require("express");
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')

//initialising server and socket.io connection
const app = express();
const cors = require("cors");
const http = require("http").createServer(app)

//setting up server "settings"
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());
app.use(cookieParser())
app.use(express.json());
app.use('/testPicture', easyStage);
app.use('/testAnswer', difficultStage);
http.listen(port, () => {
  console.log(`listening to port ${port}`)
});
