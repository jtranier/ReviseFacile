const AuthenticationService = require('../services/AuthenticationService');
module.exports = app => {
  const moodleQuizController = require('../controllers/moodleQuiz.controller');
  const AuthenticationService = require('../services/AuthenticationService');

  let router = require('express').Router();

  router.get('/:id', moodleQuizController.get);
  router.get('/', AuthenticationService.checkIsTeacher,
      moodleQuizController.list);
  router.get('/:id/latest-training',
      moodleQuizController.getWithLatestTraining);
  router.post('/:id/redo-training', moodleQuizController.redoTraining);
  router.get('/:id/results', AuthenticationService.checkIsTeacher,
      moodleQuizController.getResults);

  app.use('/api/moodle-quiz/', router);
};