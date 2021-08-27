const db = require('../models');
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
        questions: JSON.parse(data.questions)
      }
      res.send(quiz);
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message ||
          `Some error occurred while retrieving the quiz id=${id}`,
    });
  });
}
;