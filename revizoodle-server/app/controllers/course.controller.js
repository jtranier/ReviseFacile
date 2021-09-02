const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');

const Course = db.course;

exports.list = (req, res) => {
  if (!authenticationService.isAuthenticated(req)) {
    res.status(403).json({
      error: {
        message: 'You are not authenticated',
      },
    });
  }

  Course.findAll({
    raw: true,
    order: [
        ['updatedAt', 'DESC']
    ],
    where: {
      'teacherUuid': authenticationService.getUUID(req),
      // TODO Paginate
    },
  }).then(data => {
    res.json(data);
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
};

exports.create = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  console.log(req.body.name)
  Course.create({
    name: req.body.name, // TODO check validity
    teacherUuid: authenticationService.getUUID(req),
  }).then(course => {
    res.json(course['dataValues']);
  }).catch(error => {
    res.status(500).send(error);
  });

};

exports.addQuiz = (req, res) => {

};