module.exports = app => {
  const diffusionController = require('../controllers/diffusion.controller');

  let router = require('express').Router();

  router.get('/by-theme', diffusionController.findAllByTheme);

  app.use('/api/diffusions/', router);
}