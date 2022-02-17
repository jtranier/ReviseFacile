import * as express from "express"

export default function setupLearnerCourseRoute(app: express.Application) {
  const learnerCourseController = require('../controllers/LearnerCourse.controller');

  let router = require('express').Router();

  router.get('/', learnerCourseController.findAllRegistered);
  router.get('/:courseId', learnerCourseController.findAllQuizWithTrainingsForCourse);

  app.use('/api/learner/course/', router);
}