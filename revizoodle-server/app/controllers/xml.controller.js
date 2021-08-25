const fs = require('fs');
const moodleService = require('../services/MoodleService');
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
          console.log('Couln\'t read the XML file: ' + error);
          res.json({error});
        } else {
          moodleService.parseMoodleXml(text).then(json => {
            res.json(json);
          }).catch(error => {
            console.log('Couln\'t parse the XML file: ' + error);
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
          console.log('Couln\'t read the XML file: ' + error);
          res.json({error});
        } else {
          moodleService.parseMoodleXml(text).then(json => {
            MoodleQuiz.create({
              id: 123,
              teacherId: 88,
              name: 'Testing XML Quiz',
              questionsSpecification: JSON.stringify(json),
            });

            res.send("XML Imported !");
          }).catch(error => {
            console.log('Couln\'t parse the XML file: ' + error);
            res.json({error});
          });
        }
      },
  );

};