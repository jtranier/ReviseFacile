module.exports = app => {
  const xmlController = require('../controllers/xml.controller');

  let router = require('express').Router();

  router.get('/test', xmlController.test);
  router.get('/load-test', xmlController.loadTest);
  router.post('/upload', xmlController.uploadMoodleXml)

  app.use('/api/xml/', router);
}