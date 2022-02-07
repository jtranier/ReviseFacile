import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import path from "path"
import process from "process"
import {sequelize} from "./app/models"

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
app.use(fileUpload({}));

require('./app/routes/quiz.routes')(app);
require('./app/routes/training.routes')(app);
require('./app/routes/course.routes')(app);
require('./app/routes/learnerCourse.routes')(app);
require('./app/routes/xml.routes')(app);
require('./app/routes/user.routes')(app);

// Note : force: true is for development mode
sequelize.sync(/*{force: true}*/).then(() => {
  console.log("Drop & re-sync db.")
});

// Views
const resourcePath = path.join(process.cwd(), './resources/views/');
app.use(express.static(resourcePath));
app.get('/', function (req,res) {
  res.sendFile(path.join(resourcePath, "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
