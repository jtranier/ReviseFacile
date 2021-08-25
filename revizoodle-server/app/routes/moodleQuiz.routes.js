module.exports = app => {
  const moodleQuizController = require('../controllers/moodleQuiz.controller');

  let router = require('express').Router();

  router.get('/:id', moodleQuizController.get);

  app.use('/api/moodle-quiz/', router);
}