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
 * REST Controller for the Course entity
 */
import * as express from "express"
import * as AuthenticationService from '../services/AuthenticationService'
import {Model} from '../models';
import Course from "../models/Course.model"

const {assertIsFound, errorHandler} =
  require('./ControllerUtil');

/**
 * Get a Course as JSON
 * URL: /api/course/:id
 * @return 404 if not found
 * @return 500 if an error occurs
 * @return 200 CourseSummary (JSON) if OK
 */
export const get = (req: express.Request, res: express.Response) => {
  const id = req.params.id || -1;

  Model.Course.findOne({
    where: {id},
    include: {
      model: Model.Quiz,
      order: [['updatedAt', 'desc']],
    },
  })
    .then<Course>(assertIsFound(`There is no course with id ${id}`))
    .then((course) => {
      res.json(CourseSummary(course));
    }).catch(errorHandler(res));
};

/**
 * List the course of the teacher initiating the query
 * URL: /api/course
 */
export const list = (req: express.Request, res: express.Response) => {
  Model.Course.findAll({
    order: [
      ['updatedAt', 'DESC'],
    ],
    where: {
      'teacherUuid': AuthenticationService.getUUID(req),
    },
  }).then(courseList => res.json(courseList)).catch(errorHandler(res));
};

/**
 * Create a course
 * URL: POST /api/course
 * The request body must contain a name attribute
 *
 * @return 500 if something gets wrong
 * @return 200 created Course (json) if OK
 */
export const create = (req: express.Request, res: express.Response) => {
  Model.Course.create({
    name: req.body.name, // TODO check validity
    teacherUuid: AuthenticationService.getUUID(req),
  }).then(course => res.json(course)).catch(errorHandler(res));
};

/**
 * Add a Quiz to a Course
 * URL: POST /api/course/:courseId/add-quiz
 * quizId must be provided as form data
 *
 * @return 200 { success: true } if OK
 * @return 500 if an error occurs
 *
 * Implementation note : this is a very simple implementation without any
 * check ; a 500 error will be thrown if courseId or quizId are incorrect
 */
export const addQuiz = (req: express.Request, res: express.Response) => {
  const courseId = req.params.courseId;
  const quizId = req.body.quizId;

  Model.CourseQuiz.create({
    courseId: courseId,
    quizId: quizId,
  }).then(() => {
    return {success: true};
  }).catch(errorHandler(res));
};

/**
 * Register a Learner to a Course
 * URL : POST /api/course/:courseId/register
 */
export const register = (req: express.Request, res: express.Response) => {
  const courseId = req.params.courseId || -1;
  const learnerUuid = AuthenticationService.getUUID(req);

  Model.Course.findByPk(courseId, {
    include: {
      model: Model.CourseRegistration,
      where: {
        'learnerUuid': learnerUuid,
      },
      required: false,
    },
  }).then(assertIsFound(`There is no course with id ${courseId}`))
    .then((course) => {
      if (course != null && course.courseRegistrations.length > 0) {
        // Already registered
        return;
      }

      return Model.CourseRegistration.create({
        'learnerUuid': learnerUuid,
        courseId: courseId,
      });
    })
    .then((_) => res.json({success: true}))
    .catch(errorHandler(res));
};

/**
 * The summary of a course that includes the main course properties,
 * and the list of quizzes summaries (id, name, last update and
 * number of questions in the quiz)
 * @param course a course entity from db (with quizzes fetched)
 * @returns {{quizList: *, name, updateAt, id}}
 * @constructor
 */
const CourseSummary = (course: Course) => {
  return {
    id: course.id,
    name: course.name,
    updateAt: course.updatedAt,
    quizList: course['quizzes'].map(quiz => {
      return {
        id: quiz.id,
        name: quiz.name,
        updatedAt: quiz.courseQuiz.updatedAt,
        nbQuestions: quiz.nbQuestions,
      };
    }),
  };

};