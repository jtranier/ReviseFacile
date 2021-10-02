const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');
const MoodleQuiz = db.moodleQuiz;
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
    'learner_uuid': learnerUuid,
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
      resolve(quiz['trainings'][0]['dataValues']);
    } else {
      createEmptyTrainingForQuiz(quiz, learnerUuid).then(resolve).catch(reject);
    }
  });
};

exports.get = (req, res) => {
  const id = req.params.id || -1;

  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  MoodleQuiz.findByPk(id, {raw: true}).then(data => {
    if (data === null) {
      res.status(404).send({
        message: `There is no quiz with id ${id}`,
      });
    } else {

      // Parse the JSON representation of questions
      const quiz = {
        ...data,
        questions: JSON.parse(data.questions),
      };
      res.send(quiz);
    }
  }).catch(err => {
    res.status(500).send({
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
  const learner_uuid = authenticationService.getUUID(req);

  MoodleQuiz.findByPk(id, {
    include: [
      {
        model: Training,
        as: 'trainings',
        where: {
          learner_uuid,
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

    const quiz = data['dataValues'];

    getOrCreateLastTraining(quiz, learner_uuid).then(lastTraining => {
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
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  MoodleQuiz.findAll({
    raw: true,
    where: {
      'teacherUuid': authenticationService.getUUID(req),
      // TODO Paginate
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
  MoodleQuiz.findByPk(id).then(data => {

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
        }).catch(error => { throw error});
      },
  ).catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
};