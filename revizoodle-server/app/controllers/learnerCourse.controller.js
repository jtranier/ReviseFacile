const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');

const Course = db.course;
const  CourseRegistration = db.course_registration;


exports.findAllRegistered = (req, res) => {
  CourseRegistration.findAll({
    raw: true,
    where: {
      'learner_uuid': authenticationService.getUUID(req),
      // TODO Paginate
    },
    include: Course,
  }).then(data => {
    console.log(data)

    res.json(data.map(registration => {
      return {
        id: registration['course.id'],
        name: registration['course.name'],
        date: registration['updatedAt'],
      }
    }));
  }).catch(error => {
    res.status(500).send(error);
  })

}