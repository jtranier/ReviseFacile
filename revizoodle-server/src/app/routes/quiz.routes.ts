import * as AuthenticationService from '../services/AuthenticationService'

export default function setupQuizRoute(app) {
  const quizController = require('../controllers/Quiz.controller');

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