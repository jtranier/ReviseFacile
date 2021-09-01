module.exports = app => {
  const courseController = require('../controllers/course.controller');

  let router = require('express').Router();

  router.get('/', courseController.list);

  app.use('/api/course/', router);
}