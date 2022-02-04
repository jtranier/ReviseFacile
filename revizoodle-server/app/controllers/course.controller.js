const db = require('../models');
const authenticationService = require('../services/AuthenticationService');

const Course = db.Course;
const Quiz = db.Quiz;
const CourseQuiz = db.CourseQuiz;
const CourseRegistration = db.CourseRegistration;

exports.get = (req, res) => {
  const id = req.params.id || -1;

  Course.findOne({
    where: {id},
    include: {
      model: Quiz,
      order: [['updatedAt', 'desc']],
    },
  }).then(data => {
    if (!data) {
      res.status(404).json({
        error: {
          message: `There is no course with id ${id}`,
        },
      });
    } else {
      res.json({
        id: data.id,
        name: data.name,
        updateAt: data.updateAt,
        quizList: data.quizzes.map(quiz => {

          return {
            id: quiz.id,
            name: quiz.name,
            updatedAt: quiz['courseQuiz'].updatedAt,
            nbQuestions: JSON.parse(quiz.questions).length,
          };
        }),
      });
    }
  }).catch(error => {
    console.error(error);
    res.status(500).json({error});
  });

};

exports.list = (req, res) => {

  Course.findAll({
    raw: true,
    order: [
      ['updatedAt', 'DESC'],
    ],
    where: {
      'teacherUuid': authenticationService.getUUID(req),
    },
  }).then(data => {
    res.json(data);
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};

exports.create = (req, res) => {

  Course.create({
    name: req.body.name, // TODO check validity
    teacherUuid: authenticationService.getUUID(req),
  }).then(course => {
    res.json(course['dataValues']);
  }).catch(error => {
    res.status(500).json(error);
  });

};

exports.addQuiz = (req, res) => {
  const courseId = req.params.courseId;
  const quizId = req.body.quizId;

  CourseQuiz.create({
    courseId: courseId,
    quizId: quizId,
  }).then(() => {
    res.json({
      success: true,
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });

};

exports.register = (req, res) => {
  const courseId = req.params.courseId || -1;
  const learnerUuid = authenticationService.getUUID(req);

  Course.findByPk(courseId, {
    include: {
      model: CourseRegistration,
      where: {
        'learnerUuid': learnerUuid,
      },
      required: false,
    },
  }).then(course => {
    if (course === null) {
      res.status(404).
          json({error: {message: `There is no course with id ${courseId}`}});
    } else if (course['courseRegistrations'].length > 0) {
      res.json({success: true}); // Already registered

    } else {
      CourseRegistration.create({
        'learnerUuid': learnerUuid,
        courseId: courseId,
      }).then(() => {
        res.json({success: true});
      }).catch(error => {
        console.error(error);
        res.status(500).json(error);
      });

    }
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });

};