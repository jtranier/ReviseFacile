const db = require('../models');
const Quiz = db.questionnaire;

exports.get = (req, res) => {
  const id = req.params.id;

  Quiz.findByPk(id, {include: 'questions'}).then(data => {
    if (data === null) {
      res.status(404).send({
        message: `There is no quiz with id ${id}`,
      });
    }

    res.send(data);

  }).catch(err => {
    res.status(500).send({
      message: err.message ||
          `Some error occurred while retrieving the quizz id=${id}`,
    });
  });
};