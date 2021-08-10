module.exports = app => {
  const quizController = require('../controllers/quiz.controller');

  let router = require('express').Router();

  router.get('/:id', quizController.get);

  app.use('/api/quiz/', router);
}