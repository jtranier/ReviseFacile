/*
 * Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
 *
 * contributor(s) :
 * - Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
 * - John Tranier (john.tranier@ticetime.com)
 *
 * This software is governed by the CeCILL-B license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL-B
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept its terms.
 */

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import path from "path"
import process from "process"
import {sequelize} from "./app/models"
import setupCourseRoute from "./app/routes/course.routes"
import setupTrainingRoute from "./app/routes/training.routes"
import setupLearnerCourseRoute from "./app/routes/learnerCourse.routes"
import setupXmlRoute from "./app/routes/xml.routes"
import setupUserRoute from "./app/routes/user.routes"
import setupQuizRoute from "./app/routes/quiz.routes"

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
  console.log("Database ready.")
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
