module.exports = app => {
  const quizController = require('../controllers/quiz.controller');
  const AuthenticationService = require('../services/AuthenticationService');

  let router = require('express').Router();

  router.get('/:id', quizController.get);
  router.get('/', AuthenticationService.checkIsTeacher,
      quizController.list);
  router.get('/:id/latest-training',
      quizController.getWithLatestTraining);
  router.post('/:id/redo-training', quizController.redoTraining);
  router.get('/:id/results', AuthenticationService.checkIsTeacher,
      quizController.getResults);

  app.use('/api/quiz/', router);
};