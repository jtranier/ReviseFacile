
module.exports = app => {
  const learnerCourseController = require('../controllers/learnerCourse.controller');

  let router = require('express').Router();

  router.get('/', learnerCourseController.findAllRegistered);
  router.get('/:courseId', learnerCourseController.findAllTrainingsForCourse);

  app.use('/api/learner/course/', router);
}