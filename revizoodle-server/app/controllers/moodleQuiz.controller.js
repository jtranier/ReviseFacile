const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');
const MoodleQuiz = db.moodleQuiz;

exports.get = (req, res) => {
  const id = req.params.id;

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

exports.list = (req, res) => {
  if(!controllerUtil.checkIsAuthenticated(req, res)) {
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
            id: quiz.id,
            name: quiz.name,
            nbQuestions: JSON.parse(quiz.questions).length
          }
        })
    );
  }).catch(error => {
    res.sendStatus(500).json(error)
  });
};