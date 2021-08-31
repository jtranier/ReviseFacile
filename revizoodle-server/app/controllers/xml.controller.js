const fs = require('fs');
const moodleService = require('../services/MoodleService');
const authenticationService = require('../services/AuthenticationService');
const db = require('../models');
const MoodleQuiz = db.moodleQuiz;

const xmlFile = __dirname + '/../../revizoodle-db/xml/ex3Q_MoodleXML.xml';

/**
 * Action for testing Moodle XML to JSON conversion
 * @param req
 * @param res
 */
exports.test = (req, res) => {

  fs.readFile(
      xmlFile,
      'utf-8',
      function(error, text) {
        if (error) {
          console.error('Couln\'t read the XML file: ' + error);
          res.json({error});
        } else {
          moodleService.parseMoodleXml(text).then(json => {
            res.json(json);
          }).catch(error => {
            console.error('Couln\'t parse the XML file: ' + error);
            res.json({error});
          });
        }
      },
  );
};

/**
 * Action for loading the test XML file into the DB
 * @param req
 * @param res
 */
exports.loadTest = (req, res) => {
  fs.readFile(
      xmlFile,
      'utf-8',
      function(error, text) {
        if (error) {
          console.error('Couln\'t read the XML file: ' + error);
          res.json({error});
        } else {
          moodleService.parseMoodleXml(text).then(json => {
            MoodleQuiz.create({
              id: 123,
              teacherId: 88,
              name: 'Testing XML Quiz',
              questions: JSON.stringify(json.questions),
            });

            res.send('XML Imported !');
          }).catch(error => {
            console.error('Couln\'t parse the XML file: ' + error);
            res.json({error});
          });
        }
      },
  );
};

exports.uploadMoodleXml = (req, res) => {
  if(!authenticationService.isAuthenticated(req)) {
    res.sendStatus(403).json({
      error: {
        message: "You are not authenticated"
      }
    })
  }

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
      questions: JSON.stringify(json.questions),
    }).then(quiz => {
      res.json({
        success: true,
        id: quiz.id,
      });
    });
  });

};