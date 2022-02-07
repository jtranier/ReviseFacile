import * as AuthenticationService from '../services/AuthenticationService';

export default function setupXmlRoute(app) {
  const xmlController = require('../controllers/Xml.controller');

  let router = require('express').Router();

  router.post('/upload', AuthenticationService.checkIsTeacher, xmlController.uploadMoodleXml)

  app.use('/api/xml/', router);
}