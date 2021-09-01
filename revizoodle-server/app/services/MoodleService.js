const xml2js = require('xml2js');
const parser = new xml2js.Parser();

class MoodleService {

  /**
   * Convert a Moodle XML Quiz to JSON
   * @param text : String a Moodle Quiz as plain text XML
   * @returns {Promise<unknown>} a promise to convert the Quiz to JSON
   */
  parseMoodleXml(text) {
    return new Promise((resolve, reject) => {
      parser.parseStringPromise(text).then(parsedXml => {
        const questions = parsedXml.quiz.question;

        resolve(
            {
              questions: questions.filter(q => {
                return [
                  'multichoice',
                  'truefalse',
                ].includes(q['$'].type);
              }).map(question => {

                const answers = question.answer;

                return {
                  name: question['name'][0]['text'][0],
                  statement: question['questiontext'][0]['text'][0],
                  explanation: question['generalfeedback'][0]['text'][0],
                  answers: answers.map(answer => {
                    return {
                      text: answer['text'][0],
                      score: answer['$']['fraction'],
                      feedback: answer['feedback'][0]['text'][0],
                    };
                  }),
                };
              }),
            });
      }).catch(error => {
        console.error('Couldn\'t parse the XML file: ' + error);
        reject(error);
      });
    });

  }
}

module.exports = new MoodleService();