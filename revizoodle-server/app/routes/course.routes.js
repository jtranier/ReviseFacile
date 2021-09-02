module.exports = app => {
  const courseController = require('../controllers/course.controller');

  let router = require('express').Router();

  router.get('/', courseController.list);
  router.post('/', courseController.create);
  // router.get('/:courseId/add-quiz', courseController.list);

  app.use('/api/course/', router);
}