const courseController = require('../controllers/course.controller');
module.exports = app => {
  const courseController = require('../controllers/course.controller');

  let router = require('express').Router();

  router.get('/:id', courseController.get);
  router.get('/', courseController.list);
  router.post('/', courseController.create);
  router.post('/:courseId/add-quiz', courseController.addQuiz);

  app.use('/api/course/', router);
}