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

const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const Course = db.course;
const CourseRegistration = db.courseRegistration;
const Training = db.training;
const Quiz = db.quiz;

/**
 * Get the last training of a learner on a quiz
 * @param quiz Quiz object entity
 * @returns {null|*}
 */
const getLastTraining = (quiz) => {
  if(!quiz['trainings'] || !quiz['trainings'].length) {
    return null
  }

  if(quiz['trainings'].length === 1) {
    return quiz['trainings'][0];
  }

  const lastScoredTraining = quiz['trainings'].find(training => {
    return training.score !== null;
  });

  return lastScoredTraining ?
      lastScoredTraining :
      quiz['trainings'][0];
};

exports.findAllRegistered = (req, res) => {
  CourseRegistration.findAll({
    where: {
      'learnerUuid': authenticationService.getUUID(req),
    },
    include: Course,
    order: [['course', 'updatedAt', 'DESC']],
  }).then(data => {

    res.json(data.map(registration => {

      return {
        id: registration['course'].id,
        name: registration['course'].name,
        date: registration['updatedAt'],
      };
    }));
  }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};

exports.findAllTrainingsForCourse = (req, res) => {
  const courseId = req.params.courseId || -1;

  Quiz.findAll({
    include: [
      {
        model: Course,
        where: {id: courseId},
        attributes: ['id'],
      },
      {
        model: Training,
        as: 'trainings',
        where: {
          'learnerUuid': authenticationService.getUUID(req),
        },
        required: false,
      },
    ],

    order: [['updatedAt', 'desc'], ['trainings', 'updatedAt', 'desc']],
  }).
      then(data => {
        res.json(
            data.map(quiz => {
              const lastTraining = getLastTraining(quiz);

              return {
                quizId: quiz['id'],
                quizTitle: quiz['name'],
                quizDate: quiz['updatedAt'],
                lastTrainingCurrentQuestion:
                    lastTraining ?
                        lastTraining['currentQuestion'] :
                        null,
                quizNbQuestions: JSON.parse(quiz['questions']).length || 0,
                nbTrainings: quiz['trainings'].length,
                score: lastTraining ? lastTraining.score : null,
              };
            }),
        );

      }).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });
};