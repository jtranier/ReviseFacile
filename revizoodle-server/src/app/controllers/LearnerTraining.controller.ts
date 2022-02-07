/**
 * Controller for learners interact with their Trainings (i.e. submitting
 * theirs answers)
 */
import {Training} from '../models';
import {errorHandler} from './ControllerUtil'

/**
 * Update the answers submitted by the logged Learner to a Quiz
 * URL : /api/learner/training/:trainingId
 */
exports.updateLearnerAnswers = (req, res) => {

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
  ).then((_) => {
    res.json(learnerAnswers);
  }).catch(errorHandler(res));
};

// TODO Hum... Why updating the score that way ?! we should compute & update the score automatically when the last answer to a quiz is submitted...
exports.updateScore = (req, res) => {
  const score = req.body.score;

  Training.update(
    {
      score: score,
    },
    {
      where: {id: req.params.id},
    },
  ).then((_) => {
    res.json({success: true});
  }).catch(errorHandler(res));
};