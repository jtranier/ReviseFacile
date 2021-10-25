const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// default options for file upload
app.use(fileUpload());

require('./app/routes/quiz.routes')(app);
require('./app/routes/training.routes')(app);
require('./app/routes/course.routes')(app);
require('./app/routes/learnerCourse.routes')(app);
require('./app/routes/xml.routes')(app);
require('./app/routes/user.routes')(app);

const db = require("./app/models/index");

// Note : force: true is for development mode
db.sequelize.sync(/*{force: true}*/).then(() => {
  console.log("Drop & re-sync db.")
});

// Views
const path = __dirname + '/app/views/';
app.use(express.static(path));
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
