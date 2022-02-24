/*
 * Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
 *
 * contributor(s) :
 * - Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
 * - John Tranier (john.tranier@ticetime.com)
 *
 * This software is governed by the CeCILL-B license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL-B
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept its terms.
 */

import xml2js from 'xml2js'

const parser = new xml2js.Parser();

class MoodleService {

  /**
   * Convert a Moodle XML Quiz to JSON
   * @param text : String a Moodle Quiz as plain text XML
   * @returns {Promise} a promise to convert the Quiz to JSON
   */
  // TODO type
  public static parseMoodleXml(text: string): any {
    return new Promise((resolve, reject) => {
      parser.parseStringPromise(text).then(parsedXml => {
        const questions = parsedXml.quiz.question as any; // TODO type

        const removeFontSizeInstructions = function (html: string) {
          return html.replace(/(?<=;|"|\\s)font-size:[^;']*(;)?/g, '')
        }

        const extractAllImageOf = function (node: any) { // TODO type
          return node['file']?.map((fileNode: any) => {
            return extractImageOf(fileNode);
          }).filter((e:any) => e !== null) || [];
        };

        const extractImageOf = function (fileNode: any) { // TODO Type
          if (fileNode.$.encoding !== "base64")
            return null;

          // TODO check encoding && attributes (or catch errors)
          return {
            name: fileNode.$.name,
            blob: fileNode._,
          };
        };

        /**
         * Replace image references of the form <img src="@@PLUGINFILE@@/{uri}" />
         * by their Base64 representation
         * @param text
         * @param imageList
         * @returns {*}
         */
        const interpolateImages = function (text: string, imageList: any[]) { // TODO type
          imageList.forEach(image => {
            // Moodle seems to encode image name as URI, but it also encodes
            // '(' and ')' ... I ignore why... So I just replace them by their code.
            const uri = encodeURI(image.name).replace('(', '%28').replace(')', '%29');

            // Match image reference (we need to ignore eventual URI params)
            text = text.replace(
              new RegExp(`src="@@PLUGINFILE@@/${uri}(\\?.*)?"`),
              `src="data:image;base64, ${image.blob}"`
            );
          });

          return text;
        };

        const parseHtmlNode = function (node: any) { // TODO Type
          const text = node['text'][0];
          return interpolateImages(
            removeFontSizeInstructions(text),
            extractAllImageOf(node)
          );
        };

        resolve(
          {
            questions: questions.filter((q: any) => { // TODO Type
              return [
                'multichoice',
                'truefalse',
              ].includes(q['$'].type);
            }).map((question: any) => {

              const answers = question['answer'];

              return {
                name: parseHtmlNode(question['name'][0]),
                statement: parseHtmlNode(question['questiontext'][0]),
                explanation: parseHtmlNode(question['generalfeedback'][0]),
                type: resolveType(question),
                answers: answers.map((answer: any) => { // TODO Type
                  return {
                    text: parseHtmlNode(answer),
                    scoreFraction: Number.parseInt(answer['$']['fraction']),
                    feedback: parseHtmlNode(answer['feedback'][0]),
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

// TODO type
const resolveType = function (moodleQuestion: any) {

  if (moodleQuestion['$']['type'] === 'multichoice' &&
    moodleQuestion['single'][0] === 'true')
    return 'singlechoice';
  else return moodleQuestion['$']['type'];
};

export default MoodleService;