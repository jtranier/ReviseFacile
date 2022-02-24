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

/**
 * Controller for actions on course for Learners
 */
import * as AuthenticationService from '../services/AuthenticationService'
import * as express from "express"
import {Model} from '../models';
import Quiz from "../models/Quiz.model"
import CourseRegistration from "../models/CourseRegistration.model"

const {
  errorHandler,
} = require('./ControllerUtil');

/**
 * Find all courses on which the current learner is registered
 * @return List<RegistrationSummary> as JSON
 * URL : GET /api/learner/course/
 */
exports.findAllRegistered = (req: express.Request, res: express.Response) => {
  Model.CourseRegistration.findAll({
    where: {
      'learnerUuid': AuthenticationService.getUUID(req),
    },
    include: Model.Course,
    order: [['course', 'updatedAt', 'DESC']],
  }).then((courseRegistrationList) => {

    res.json(courseRegistrationList.map(RegistrationSummary));
  }).catch(errorHandler(res));
};

/**
 * Get the info about the quizzes and trainings belonging to a course on which
 * the logged Learner is registered
 * @return List<QuizWithTrainingsSummary> as JSON
 * URL : GET /api/learner/course/:courseId
 */
exports.findAllQuizWithTrainingsForCourse = (req: express.Request, res: express.Response) => {
  const courseId = req.params.courseId || -1;

  Model.Quiz.findAll({
    include: [
      {
        model: Model.Course,
        where: {id: courseId},
        attributes: ['id'],
      },
      {
        model: Model.Training,
        as: 'trainings',
        where: {
          'learnerUuid': AuthenticationService.getUUID(req),
        },
        required: false,
      },
    ],

    order: [['updatedAt', 'desc'], ['trainings', 'updatedAt', 'desc']],
  }).then((quizList) => {
    res.json(
      quizList.map(QuizWithTrainingsSummary),
    );

  }).catch(errorHandler(res));
};

/**
 * Info about a course on which a learner is registered
 * @param courseRegistration
 * @return {{date, name, id}}
 * @constructor
 */
const RegistrationSummary = function (courseRegistration: CourseRegistration) {
  return {
    id: courseRegistration['course'].id,
    name: courseRegistration['course'].name,
    date: courseRegistration['updatedAt'],
  };
};

/**
 * Info for learners about a Quiz on which they are registered and their
 * trainings on it
 * @param quiz
 * @return {{nbTrainings, quizDate, score: (null|*|null), lastTrainingCurrentQuestion: (*|null), quizNbQuestions, quizId, quizTitle}}
 * @constructor
 */
const QuizWithTrainingsSummary = function (quiz: Quiz) {
  const lastTraining = getLastTraining(quiz);

  return {
    quizId: quiz['id'],
    quizTitle: quiz['name'],
    quizDate: quiz['updatedAt'],
    lastTrainingCurrentQuestion:
      lastTraining ?
        lastTraining['currentQuestion'] :
        null,
    quizNbQuestions: quiz['nbQuestions'],
    nbTrainings: quiz['trainings'].length,
    score: lastTraining ? lastTraining.score : null,
  };
}

/**
 * Get the last training of a learner on a quiz
 * @param quiz Quiz object entity
 * @returns {null|*}
 */
const getLastTraining = (quiz: Quiz) => {
  if (!quiz['trainings'] || !quiz['trainings'].length) {
    return null;
  }

  if (quiz['trainings'].length === 1) {
    return quiz['trainings'][0];
  }

  const lastScoredTraining = quiz['trainings'].find(training => {
    return training.score !== null;
  });

  return lastScoredTraining ?
    lastScoredTraining :
    quiz['trainings'][0];
};