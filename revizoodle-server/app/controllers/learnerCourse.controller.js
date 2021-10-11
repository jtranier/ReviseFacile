const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const Course = db.course;
const CourseRegistration = db.course_registration;
const Training = db.training;
const Quiz = db.moodleQuiz;

/**
 * Get the last training of a learner on a quiz
 * @param quiz Quiz object entity
 * @returns {null|*}
 */
const getLastTraining = (quiz) => {
  if(!quiz['trainings'] || !quiz['trainings'].length) {
    return null
  }

  if(quiz['trainings'].length === 1) {
    return quiz['trainings'][0];
  }

  const lastScoredTraining = quiz['trainings'].find(training => {
    return training.score !== null;
  });

  return lastScoredTraining ?
      lastScoredTraining :
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
    order: [['course', 'updatedAt', 'DESC']],
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
              const lastTraining = getLastTraining(quiz);

              return {
                quizId: quiz['id'],
                quizTitle: quiz['name'],
                quizDate: quiz['updatedAt'],
                lastTrainingCurrentQuestion:
                    lastTraining ?
                        lastTraining['currentQuestion'] :
                        null,
                quizNbQuestions: JSON.parse(quiz['questions']).length || 0,
                nbTrainings: quiz['trainings'].length,
                score: lastTraining ? lastTraining.score : null,
              };
            }),
        );

      }).catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
};