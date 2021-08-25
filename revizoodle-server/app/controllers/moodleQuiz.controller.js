const db = require('../models');
const MoodleQuiz = db.moodleQuiz;

exports.get = (req, res) => {
  const id = req.params.id;

  MoodleQuiz.findByPk(id).then(data => {
    if (data === null) {
      res.status(404).send({
        message: `There is no quiz with id ${id}`,
      });
    } else {

      console.log(data);
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message ||
          `Some error occurred while retrieving the quiz id=${id}`,
    });
  });
}
;