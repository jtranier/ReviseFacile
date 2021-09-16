const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const {where} = require('sequelize');

const Course = db.course;
const CourseRegistration = db.course_registration;
const Training = db.training;
const Quiz = db.moodleQuiz;

/**
 * Get the last training of a learner on a quiz
 * @param quiz Quiz object entity
 * @returns {null|*}
 */
const lastTraining = (quiz) => {
  return !quiz['trainings'] || !quiz['trainings'].length ?
      null :
      quiz['trainings'][0];
};

exports.findAllRegistered = (req, res) => {
  CourseRegistration.findAll({
    raw: true,
    where: {
      'learner_uuid': authenticationService.getUUID(req),
      // TODO Paginate
    },
    include: Course,
  }).then(data => {
    res.json(data.map(registration => {
      return {
        id: registration['course.id'],
        name: registration['course.name'],
        date: registration['updatedAt'],
      };
    }));
  }).catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
};

exports.findAllTrainingsForCourse = (req, res) => {
  const courseId = req.params.courseId || -1;

  Quiz.findAll({
    include: [
      {
        model: Course,
        where: {id: courseId},
        attributes: ['id'],
      },
      {
        model: Training,
        as: 'trainings',
        where: {
          'learner_uuid': authenticationService.getUUID(req),
        },
        required: false,
      },
    ],

    order: [['updatedAt', 'desc'], ['trainings', 'updatedAt', 'desc']],
  }).
      then(data => {
        res.json(
            data.map(quiz => {
              return {
                quizId: quiz['id'],
                quizTitle: quiz['name'],
                quizDate: quiz['updatedAt'],
                quizNbQuestions: JSON.parse(quiz['questions']).length || 0,
                nbTrainings: quiz['trainings'].length,
                score: lastTraining(quiz) ? lastTraining(quiz).score : null,
              };
            }),
        );

      }).catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
};