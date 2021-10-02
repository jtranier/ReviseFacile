const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');
const Training = db.training;

// TODO Rename into updateAnswers
exports.update = (req, res) => {

  const questionIndex = req.body.questionIndex;
  const learnerAnswers = JSON.parse(req.body.learnerAnswers);

  learnerAnswers[questionIndex].submitted = true;

  Training.update(
      {
        currentQuestion: questionIndex,
        answers: JSON.stringify(learnerAnswers),
      },
      {
        where: {id: req.params.id},
      },
  ).then(() => {
    res.json(learnerAnswers);
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};

exports.updateScore = (req, res) => {
  const score = req.body.score;

  Training.update(
      {
        score: score,
      },
      {
        where: {id: req.params.id},
      },
  ).then((result) => {
    res.json({success: true});
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};