module.exports = app => {
  const moodleQuizController = require('../controllers/moodleQuiz.controller');

  let router = require('express').Router();

  router.get('/:id', moodleQuizController.get);
  router.get('/', moodleQuizController.list);
  router.get('/:id/latest-training', moodleQuizController.getWithLatestTraining);
  router.post('/:id/redo-training', moodleQuizController.redoTraining)
  router.get('/:id/results', moodleQuizController.getResults)

  app.use('/api/moodle-quiz/', router);
}