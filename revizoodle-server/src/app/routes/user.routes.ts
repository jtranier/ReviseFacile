import * as express from "express"

export default function setupUserRoute(app: express.Application) {
  const userController = require('../controllers/User.controller');

  let router = require('express').Router();

  router.get('/is-teacher', userController.isTeacher);
  router.post('/request-teacher-access', userController.requestTeacherAccess);

  app.use('/api/user/', router);
}