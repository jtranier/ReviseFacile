const db = require('../models');
const Diffusion = db.diffusion;
const Op = db.Sequelize.Op;

// TODO *** Remove this controller
exports.findAllByTheme = (req, res) => {
  const themeId = req.query.thematique;

  Diffusion.findAll({
    where: {
      'classe_id': themeId,
    },
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
          err.message || 'Some error occurred while retrieving diffusions.',
    });
  });
};