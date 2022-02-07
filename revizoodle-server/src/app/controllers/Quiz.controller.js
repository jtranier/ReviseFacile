/**
 * REST Controller for Quiz entity
 */
// TODO Think to move dedicated Learners actions to a dedicated controller
const authenticationService = require('../services/AuthenticationService');
const {Op} = require('sequelize');
import {Quiz, Training} from '../models';

const {
  assertIsFound,
  errorHandler,
  assertIsOwner,
  assertLearnerIsRegisteredOnQuiz,
} = require('./ControllerUtil');

/**
 * Private methode for creating a new Training on a Quiz for a Learner.
 * @param quiz
 * @param learnerUuid
 * @return {*}
 */
const createEmptyTrainingForQuiz = (quiz, learnerUuid) => {
  const questions = JSON.parse(quiz.questions);

  const createEmptyLearnerAnswer = function(question) {
    return {
      submitted: false, // TODO replace by score ?
      nbChoice: question.answers.length,
      choices: question.answers.map(() => false),
    };
  };

  return Training.create({
    quizId: quiz.id,
    'learnerUuid': learnerUuid,
    score: null,
    answers: JSON.stringify(
        questions.map(createEmptyLearnerAnswer),
    ),
  });
};

/**
 * Private method for getting the last training of a Learner on a Quiz, or
 * creating the 1st one on the fly if there is none.
 * @param quiz
 * @param learnerUuid
 * @return {Promise<{quiz, lastTraining}>}
 */
const getOrCreateLastTraining = (quiz, learnerUuid) => {
  return new Promise((resolve, reject) => {
    // Create training on the fly if needed
    if (quiz['trainings'].length > 0) {
      resolve({
        quiz,
        lastTraining: quiz['trainings'][0],
      });
    } else {
      createEmptyTrainingForQuiz(quiz, learnerUuid).
          then(lastTraining => resolve({
            quiz,
            lastTraining,
          })).
          catch(reject);
    }
  });
};

/**
 * Get a Quiz
 * The logged user must be the owner of the quiz
 * URL : GET /api/quiz/:quizId
 */
exports.get = (req, res) => {
  const id = req.params.id || -1;

  Quiz.findByPk(id, {raw: true}).
      then(assertIsFound(`There is no quiz with id ${id}`)).
      then(assertIsOwner(
          req,
          (data) => {
            return data.teacherUuid;
          },
          `You are not the owner of the quiz ${id}`,
      )).
      then(data => {
        // Parse the JSON representation of questions
        const quiz = {
          ...data,
          questions: JSON.parse(data.questions),
        };
        res.json(quiz);
      }).
      catch(
          errorHandler(
              res,
              `Some error occurred while retrieving the quiz id=${id}`,
          ),
      );
};

/**
 * Get a Quiz associated with info about the last training of the logged
 * Learner on that Quiz
 * The 1st Training will be created on the fly if there is no training for the
 * learner
 * URL : GET /api/quiz/:id/latest-training
 */
exports.getWithLatestTraining = (req, res) => {
  const id = req.params.id || -1;
  const learnerUuid = authenticationService.getUUID(req);

  Quiz.findByPk(id, {
    include: [
      {
        model: Training,
        as: 'trainings',
        where: {
          learnerUuid: learnerUuid,
        },
        limit: 1,
        required: false,
        order: [['updatedAt', 'desc']],
      }],

  }).
      then(assertIsFound(`There is no quiz with id ${id}`)).
      then(quiz => getOrCreateLastTraining(quiz, learnerUuid)).
      then(data => {
        const quiz = data.quiz;
        const lastTraining = data.lastTraining;
        const questions = JSON.parse(quiz.questions);
        const learnerAnswers = JSON.parse(lastTraining.answers);

        res.json({
          id: quiz.id,
          name: quiz.name,
          trainingId: lastTraining.id,
          questions,
          learnerAnswers,
        });

      }).
      catch(errorHandler(res));
};

/**
 * List all the quizzes of a Teacher
 * URL : GET /api/quiz
 * @return List<QuizSummary> as JSON
 */
exports.list = (req, res) => {

  Quiz.findAll({
    where: {
      'teacherUuid': authenticationService.getUUID(req),
    },
  }).
      then(data => res.json(data.map(QuizSummary))).
      catch(errorHandler(res));
};

/**
 * Action to start a new Training on a Quiz for a Learner
 * URL: POST /api/quiz/:quizId/redo-training
 */
exports.redoTraining = (req, res) => {
  const quizId = req.params.id || -1;
  const learnerUuid = authenticationService.getUUID(req);

  Quiz.findByPk(quizId).
      then(assertIsFound(`There is no quiz with id ${quizId}`)).
      then(assertLearnerIsRegisteredOnQuiz(learnerUuid, quizId)).
      then((quiz) => createEmptyTrainingForQuiz(quiz, learnerUuid)).
      then((training) => res.json(training)).
      catch(errorHandler(res));
};

/**
 * Render the results on a Quiz as a ResultsSummary as JSON
 * URL : GET /api/quiz/:id/results
 */
exports.getResults = (req, res) => {
  const quizId = req.params.id || -1;

  Promise.all([
    Quiz.findByPk(quizId, {
      attributes: ['id', 'name', 'nbQuestions', 'teacherUuid'],
    }).
        then(assertIsFound(`There is no quiz with id ${quizId}`)).
        then(assertIsOwner(
            req,
            (quiz) => quiz.teacherUuid,
            `You are not the owner of the quiz ${quizId}`,
        )),
    Training.findAll({
      where: {
        quizId: quizId,
        score: {[Op.ne]: null},
      },
      include: {
        model: Quiz,
        attributes: ['name'],
      },
      order: [
        ['id', 'ASC'],
      ],
    }).catch(
        errorHandler(
            res,
            `Some error occurred while retrieving the results of the quiz id=${quizId}`,
        ),
    ),
  ]).then((data) => {
    const quiz = data[0];
    const trainingList = data[1];

    res.json(ResultsSummary(quiz, trainingList));
  }).catch(errorHandler(
          res,
          `Some error occurred while retrieving the results of the quiz id=${quizId}`,
      ),
  );
};

/**
 * A QuizSummary contains the main info of a Quiz but not the questions
 * @param quiz
 * @return {{nbQuestions, date, name, id}}
 * @constructor
 */
const QuizSummary = (quiz) => {
  return {
    id: quiz['id'],
    name: quiz['name'],
    nbQuestions: quiz['nbQuestions'],
    date: quiz['updatedAt'],
  };
};

/**
 * Build the results data for a Quiz
 * @param quiz
 * @param trainingList
 * @constructor
 */
const ResultsSummary = function(quiz, trainingList) {
  const nbAttempts = trainingList.length;
  const learners = new Set();
  let data1stAttempt = Array.from({length: quiz.nbQuestions},
      () => []);

  trainingList.forEach(training => {
    if (!learners.has(training['learnerUuid'])) {
      learners.add(training['learnerUuid']);

      const currentTrainingAnswers = JSON.parse(training['answers']);
      currentTrainingAnswers.forEach((value, index) => {
        data1stAttempt[index].push(value['score']);
      });
    }
  });
  const nbLearners = learners.size;

  return {
    quizId: quiz.id,
    quizName: quiz.name,
    nbAttempts,
    nbLearners,
    results1stAttempt: data1stAttempt.map(computeMean),
  };
};

/**
 * Compute the mean of an array of scores obtained by learners on a question
 * @param questionScoreList
 * @return {number}
 */
const computeMean = function(questionScoreList) {
  return Math.round(
      questionScoreList.reduce((a, b) => {
        return a + b;
      }, 0) / questionScoreList.length,
  );
};