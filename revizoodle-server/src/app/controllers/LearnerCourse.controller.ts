/**
 * Controller for actions on course for Learners
 */
import authenticationService from '../services/AuthenticationService'
import {Course, CourseRegistration, Quiz, Training} from '../models';

const {
  errorHandler,
} = require('./ControllerUtil');

/**
 * Find all courses on which the current learner is registered
 * @return List<RegistrationSummary> as JSON
 * URL : GET /api/learner/course/
 */
exports.findAllRegistered = (req, res) => {
  CourseRegistration.findAll({
    where: {
      'learnerUuid': authenticationService.getUUID(req),
    },
    include: Course,
    order: [['course', 'updatedAt', 'DESC']],
  }).then((courseRegistrationList) => {

    res.json(courseRegistrationList.map(RegistrationSummary));
  }).catch(errorHandler(res));
};

/**
 * Get the info about the quizzes and trainings belonging to a course on which
 * the logged Learner is registered
 * @return List<QuizWithTrainingsSummary> as JSON
 * URL : GET /api/learner/course/:courseId
 */
exports.findAllQuizWithTrainingsForCourse = (req, res) => {
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
          'learnerUuid': authenticationService.getUUID(req),
        },
        required: false,
      },
    ],

    order: [['updatedAt', 'desc'], ['trainings', 'updatedAt', 'desc']],
  }).then((quizList) => {
    res.json(
      quizList.map(QuizWithTrainingsSummary),
    );

  }).catch(errorHandler(res));
};

/**
 * Info about a course on which a learner is registered
 * @param courseRegistration
 * @return {{date, name, id}}
 * @constructor
 */
const RegistrationSummary = function (courseRegistration) {
  return {
    id: courseRegistration['course'].id,
    name: courseRegistration['course'].name,
    date: courseRegistration['updatedAt'],
  };
};

/**
 * Info for learners about a Quiz on which they are registered and their
 * trainings on it
 * @param quiz
 * @return {{nbTrainings, quizDate, score: (null|*|null), lastTrainingCurrentQuestion: (*|null), quizNbQuestions, quizId, quizTitle}}
 * @constructor
 */
const QuizWithTrainingsSummary = function (quiz) {
  const lastTraining = getLastTraining(quiz);

  return {
    quizId: quiz['id'],
    quizTitle: quiz['name'],
    quizDate: quiz['updatedAt'],
    lastTrainingCurrentQuestion:
      lastTraining ?
        lastTraining['currentQuestion'] :
        null,
    quizNbQuestions: quiz['nbQuestions'],
    nbTrainings: quiz['trainings'].length,
    score: lastTraining ? lastTraining.score : null,
  };
}

/**
 * Get the last training of a learner on a quiz
 * @param quiz Quiz object entity
 * @returns {null|*}
 */
const getLastTraining = (quiz) => {
  if (!quiz['trainings'] || !quiz['trainings'].length) {
    return null;
  }

  if (quiz['trainings'].length === 1) {
    return quiz['trainings'][0];
  }

  const lastScoredTraining = quiz['trainings'].find(training => {
    return training.score !== null;
  });

  return lastScoredTraining ?
    lastScoredTraining :
    quiz['trainings'][0];
};