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

import * as express from "express"
import * as AuthenticationService from '../services/AuthenticationService'
import {Model} from '../models';
import Quiz from "../models/Quiz.model"

type MaybeNull<T> = T | null;

/**
 * Default error handler for http response
 * @param httpResponse the httpResponse provided by the controller to prepare
 * the response
 * @param defaultMessage (optional), if provided and if the error object does
 * not contain a message, the default message will be used.
 */
export const errorHandler = (httpResponse: express.Response, defaultMessage?: string) => (error: any) => {
  if (defaultMessage) {
    error.message = error.message || defaultMessage;
  }

  console.error(error);
  httpResponse.status(error.statusCode || 500).json({error});
};

/**
 * Check the data (provided by a promise) are not null or undefined
 * If data is defined it just return them so the process can go on
 * If data is undefined or null it throws an error that will be handled by
 * the controller error handler
 * @param notFoundMessage
 */
export const assertIsFound = <T>(notFoundMessage: string) => (data: MaybeNull<T>): T => {

  if (!data) {
    throw {
      statusCode: 404,
      message: notFoundMessage,
    };
  }

  return data!;
};

/**
 * Check the logged user is the owner of the manipulated data
 * If so, it will just pass the data
 * Is not, it will throw an error with status 401 (Unauthorized)
 * @param req  the HTTP request to get the logged user
 * @param getOwnerUUID the function that gets the owner from the data
 * @param notOwnerMessage the error message in case the logged user is not the
 * owner
 * @return callback that just return the provided data if OK or throw an error
 */
export const assertIsOwner = <T>(req: express.Request, getOwnerUUID: (data: T) => string, notOwnerMessage: string) => (data: T): T => {
  if (getOwnerUUID(data) !== AuthenticationService.getUUID(req)) {
    throw {
      statusCode: 401,
      message: notOwnerMessage,
    };
  }
  return data;
};

/**
 * Check that the logged learner is registered on a course that contains the
 * Quiz
 * @param learnerUUID
 * @return callback that just return the provided data if OK or throw an error
 */
export const assertLearnerIsRegisteredOnQuiz = (learnerUUID: string) =>
  (quiz: Quiz): PromiseLike<Quiz> => {
    return new Promise<Quiz>((resolve, reject) => {
      Model.CourseRegistration.findAll(
        {where: {learnerUuid: learnerUUID}},
      )
        .then(registrationList => {
          return Model.CourseQuiz.findOne({
            where: {
              quizId: quiz.id,
              courseId: registrationList.map(
                registration => registration.courseId),
            },
          });
        })
        .then(courseQuiz => {
            if (!courseQuiz) {
              throw {
                statusCode: 401,
                message: `The learner ${learnerUUID} is not registered on the quiz ${quiz.id}`,
              };
            }

            resolve(quiz);
          },
        )
        .catch(reject);
    });

  };