const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');
const {Op} = require('sequelize');
const Quiz = db.quiz;
const Training = db.training;

const createEmptyTrainingForQuiz = (quiz, learnerUuid) => {
  const questions = JSON.parse(quiz.questions);

  const createEmptyLearnerAnswer = function(question) {
    return {
      submitted: false, // TODO replace by score ?
      nbChoice: question.answers.length,
      choices: question.answers.reduce((result, answer, index) => {
        result[index] = false;
        return result;
      }, {}),
    };
  };

  return Training.create({
    quizId: quiz.id,
    'learnerUuid': learnerUuid,
    score: null,
    answers: JSON.stringify(
        questions.reduce((result, question, index) => {
              result[index] = createEmptyLearnerAnswer(question);
              return result;
            }
            , {}),
    ),
  });
};

const getOrCreateLastTraining = (quiz, learnerUuid) => {
  return new Promise((resolve, reject) => {
    // Create training on the fly if needed
    if (quiz['trainings'].length > 0) {
      resolve(quiz['trainings'][0]);
    } else {
      createEmptyTrainingForQuiz(quiz, learnerUuid).then(resolve).catch(reject);
    }
  });
};

exports.get = (req, res) => {
  const id = req.params.id || -1;

  Quiz.findByPk(id, {raw: true}).then(data => {
    if (data === null) {
      res.status(404).json({
        message: `There is no quiz with id ${id}`,
      });

    } else if (data.teacherUuid !== authenticationService.getUUID(req)) {
      res.status(401).json({
        message: `You are not the owner of the quiz ${id}`,
      });
    } else {

      // Parse the JSON representation of questions
      const quiz = {
        ...data,
        questions: JSON.parse(data.questions),
      };
      res.json(quiz);
    }
  }).catch(err => {
    res.status(500).json({
      message: err.message ||
          `Some error occurred while retrieving the quiz id=${id}`,
    });
  });
};

exports.getWithLatestTraining = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

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

  }).then(data => {

    if (data === null) {
      res.status(404).json({
        error: {
          message: `There is no quiz with id ${id}`,
        },
      });
      return;
    }

    const quiz = data;

    getOrCreateLastTraining(quiz, learnerUuid).then(lastTraining => {
      const questions = JSON.parse(quiz.questions);
      const learnerAnswers = JSON.parse(lastTraining.answers);

      res.json({
        id: quiz.id,
        name: quiz.name,
        trainingId: lastTraining.id,
        questions,
        learnerAnswers,
      });

    }).catch(error => {
      throw error;
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });

};

exports.list = (req, res) => {

  Quiz.findAll({
    where: {
      'teacherUuid': authenticationService.getUUID(req),
    },
  }).then(data => {
    res.json(
        data.map(quiz => {
          return {
            id: quiz['id'],
            name: quiz['name'],
            nbQuestions: JSON.parse(quiz['questions']).length,
            date: quiz['updatedAt'],
          };
        }),
    );
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};

exports.redoTraining = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  const id = req.params.id || -1;
  const learnerUuid = authenticationService.getUUID(req);

  // Get the quiz
  // TODO check the learner is allowed to access to this quiz
  Quiz.findByPk(id).then(data => {

        if (data === null) {
          res.status(404).json({
            error: {
              message: `There is no quiz with id ${id}`,
            },
          });
          return;
        }

        createEmptyTrainingForQuiz(data, learnerUuid).then(result => {
          res.json(result);
        }).catch(error => {
          throw error;
        });
      },
  ).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};

exports.getResults = (req, res) => {
  const quizId = req.params.id || -1;

  Quiz.findByPk(quizId, {
    attributes: ['id', 'name', 'nbQuestions', 'teacherUuid'],
  }).then(quiz => {
    if (quiz === null) {
      res.status(404).json({
        message: `There is no quiz with id ${quizId}`,
      });
    } else if (quiz.teacherUuid !== authenticationService.getUUID(req)) {
      res.status(401).json({
        message: `You are not the owner of the quiz ${quizId}`,
      });
    } else {
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
      }).then(data => {
        const nbAttempts = data.length;
        const learners = new Set();
        let data1stAttempt = Array.from({length: quiz.nbQuestions}, () => []);

        data.forEach(training => {
          if (!learners.has(training['learnerUuid'])) {
            learners.add(training['learnerUuid']);

            const currentTrainingAnswers = JSON.parse(training['answers']);
            for (let [questionIndex, value] of Object.entries(
                currentTrainingAnswers)) {

              data1stAttempt[Number.parseInt(questionIndex)].push(
                  value['score']);
            }

          }
        });
        const nbLearners = learners.size;

        res.json({
          quizId: quiz.id,
          quizName: quiz.name,
          nbAttempts,
          nbLearners,
          results1stAttempt: data1stAttempt.map(questionResult => {
            return Math.floor(
                questionResult.reduce((a, b) => {
                  return a + b;
                }, 0) / questionResult.length,
            );
          }),
        });
      }).catch(err => {
        console.error(err);
        res.status(500).json({
          message: err.message ||
              `Some error occurred while retrieving the results of the quiz id=${quizId}`,
        });
      });
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({
      message: err.message ||
          `Some error occurred while retrieving the quiz id=${quizId}`,
    });
  });

};