import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import setupCourseRoute from "./routes/course.routes"
import setupQuizRoute from "./routes/quiz.routes"
import setupTrainingRoute from "./routes/training.routes"
import setupLearnerCourseRoute from "./routes/learnerCourse.routes"
import setupXmlRoute from "./routes/xml.routes"
import setupUserRoute from "./routes/user.routes"
import {sequelize} from "./models"
import path from "path"
import process from "process"

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

setupCourseRoute(app);
setupQuizRoute(app);
setupTrainingRoute(app);
setupLearnerCourseRoute(app);
setupXmlRoute(app);
setupUserRoute(app);

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

export default app;