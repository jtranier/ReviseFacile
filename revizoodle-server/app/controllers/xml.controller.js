/*
 * Copyright [name of the author when individual or of the
 * legal entity when the software has been created under wage-earning status
 * adding underneath, if so required :" contributor(s) : [name of the
 * individuals] ([date of creation])
 *
 * [e-mail of the author(s)]
 *
 * This software is a computer program whose purpose is to [describe
 * functionalities and technical features of your software].
 *
 * This software is governed by the [CeCILL|CeCILL-B|CeCILL-C] license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the [CeCILL|CeCILL-B|CeCILL-C]
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

const moodleService = require('../services/MoodleService');
const db = require('../models');
const Quiz = db.quiz;

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
    Quiz.create({
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