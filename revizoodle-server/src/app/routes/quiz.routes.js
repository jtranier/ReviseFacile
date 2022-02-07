module.exports = app => {
  const quizController = require('../controllers/Quiz.controller');
  const AuthenticationService = require('../services/AuthenticationService');

  let router = require('express').Router();

  router.get('/:id', quizController.get);
  router.get(
      '/',
      AuthenticationService.checkIsTeacher,
      quizController.list
  );
  router.get(
      '/:id/latest-training',
      AuthenticationService.checkIsAuthenticated,
      quizController.getWithLatestTraining
  );
  router.post(
      '/:id/redo-training',
      AuthenticationService.checkIsAuthenticated,
      quizController.redoTraining
  );
  router.get(
      '/:id/results',
      AuthenticationService.checkIsTeacher,
      quizController.getResults
  );

  app.use('/api/quiz/', router);
};