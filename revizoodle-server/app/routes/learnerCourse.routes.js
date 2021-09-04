
module.exports = app => {
  const learnerCourseController = require('../controllers/learnerCourse.controller');

  let router = require('express').Router();

  router.get('/', learnerCourseController.findAllRegistered);

  app.use('/api/learner/course/', router);
}