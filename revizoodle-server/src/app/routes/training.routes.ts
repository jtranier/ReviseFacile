export default function setupTrainingRoute(app) {
  const trainingController = require('../controllers/LearnerTraining.controller');

  let router = require('express').Router();
  router.put('/:id', trainingController.updateLearnerAnswers);
  router.put('/:id/score', trainingController.updateScore);

  app.use('/api/learner/training/', router);
}