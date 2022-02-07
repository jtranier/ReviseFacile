import * as AuthenticationService from '../services/AuthenticationService'

export default function setupCourseRoute(app) {
  const courseController = require('../controllers/Course.controller');

  let router = require('express').Router();

  // Get course
  router.get('/:id', courseController.get);

  // List course
  router.get('/',
      AuthenticationService.checkIsTeacher,
      courseController.list
  );

  // Create course
  router.post('/',
      AuthenticationService.checkIsTeacher,
      courseController.create,
  );

  // Add quiz to course
  router.post(
      '/:courseId/add-quiz',
      AuthenticationService.checkIsTeacher,
      courseController.addQuiz,
  );

  // Register to course
  router.post('/:courseId/register',
      AuthenticationService.checkIsAuthenticated,
      courseController.register,
  );

  app.use('/api/course/', router);
}