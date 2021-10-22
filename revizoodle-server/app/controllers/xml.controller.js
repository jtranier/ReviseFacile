const moodleService = require('../services/MoodleService');
const db = require('../models');
const MoodleQuiz = db.moodleQuiz;

exports.uploadMoodleXml = (req, res) => {
   if (!req.files || !('xmlFile' in req.files)) {

    return res.status(400).json({
      success: false,
      error: {
        message: 'No files were uploaded.',
      },
    });
  }

  // accessing the file
  const xmlFile = req.files.xmlFile;

  moodleService.parseMoodleXml(
      xmlFile.data.toString(),
  ).then(json => {
    MoodleQuiz.create({
      teacherUuid: req.headers.uuid,
      name: req.body.quizName || 'Unnamed quiz',
      nbQuestions: json.questions.length,
      questions: JSON.stringify(json.questions),
    }).then(quiz => {
      res.json({
        success: true,
        id: quiz.id,
      });
    });
  });

};