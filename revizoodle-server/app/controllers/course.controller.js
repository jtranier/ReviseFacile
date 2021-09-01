const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const Course = db.course;

exports.list = (req, res) => {
  if (!authenticationService.isAuthenticated(req)) {
    res.sendStatus(403).json({
      error: {
        message: 'You are not authenticated',
      },
    });
  }

  Course.findAll({
    raw: true,
    where: {
      'teacherUuid': authenticationService.getUUID(req),
      // TODO Paginate
    },
  }).then(data => {
    res.json(data);
  }).catch(error => {
    console.log(error)
    res.status(500).send(error)
  });
};