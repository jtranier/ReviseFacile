const db = require('../models');
const Quiz = db.questionnaire;

exports.get = (req, res) => {
  const id = req.params.id;

  Quiz.findByPk(id, {include: 'questions'}).then(data => {
    if (data === null) {
      res.status(404).send({
        message: `There is no quiz with id ${id}`,
      });
    } else {

      res.send({
        questions: data.questions.map(dbQuestion => {
          const jsonData = JSON.parse(dbQuestion['contenu_json']);

          // Export the the client format
          return {
            id: jsonData.id,
            statement: jsonData.enonce,
            explanation: jsonData.explication,
            correctAnswerIndex: jsonData.bonneReponse,
            answerList: jsonData.reponses,
            feedbackList: jsonData.feedbacks,
            hint: jsonData.aide,
          };
        }),
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message ||
          `Some error occurred while retrieving the quiz id=${id}`,
    });
  });
}
;