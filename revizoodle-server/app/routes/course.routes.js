module.exports = app => {
  const courseController = require('../controllers/Course.controller');
  const AuthenticationService = require('../services/AuthenticationService');

  let router = require('express').Router();

  router.get('/:id', courseController.get);
  router.get('/', AuthenticationService.checkIsTeacher, courseController.list);
  router.post('/',
      AuthenticationService.checkIsTeacher,
      courseController.create
  );
  router.post(
      '/:courseId/add-quiz',
      AuthenticationService.checkIsTeacher,
      courseController.addQuiz
  );
  router.post('/:courseId/register',
      AuthenticationService.checkIsAuthenticated,
      courseController.register
  );

  app.use('/api/course/', router);
};