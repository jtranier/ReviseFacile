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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Revizoodle application." });
});

// default options for file upload
app.use(fileUpload());

require('./app/routes/diffusion.routes')(app);
require('./app/routes/quiz.routes')(app);
require('./app/routes/moodleQuiz.routes')(app);
require('./app/routes/xml.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models/index");

// Note : force: true is for development mode
db.sequelize.sync().then(() => {
  console.log("Drop & re-sync db.")
});