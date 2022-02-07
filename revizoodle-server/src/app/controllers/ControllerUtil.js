const authenticationService = require('../services/AuthenticationService');
import {CourseQuiz, CourseRegistration} from '../models';

/**
 * Default error handler for http response
 * @param httpResponse the httpResponse provided by the controller to prepare
 * the response
 * @param defaultMessage (optional), if provided and if the error object does
 * not contain a message, the default message will be used.
 */
const errorHandler = (httpResponse, defaultMessage) => (error) => {
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
const assertIsFound = (notFoundMessage) => (data) => {

  if (!data) {
    throw {
      statusCode: 404,
      message: notFoundMessage,
    };
  }

  return data;
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
const assertIsOwner = (req, getOwnerUUID, notOwnerMessage) => (data) => {
  if (getOwnerUUID(data) !== authenticationService.getUUID(req)) {
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
 * @param quizId
 * @return callback that just return the provided data if OK or throw an error
 */
const assertLearnerIsRegisteredOnQuiz = (learnerUUID, quizId) =>
    (data) => {
      return CourseRegistration.findAll(
          {where: {learnerUuid: learnerUUID}},
      ).
          then(registrationList => {
            return CourseQuiz.findOne({
              where: {
                quizId,
                courseId: registrationList.map(
                    registration => registration['courseId']),
              },
            });
          }).
          then(courseQuiz => {
                if (!courseQuiz) {
                  throw {
                    statusCode: 401,
                    message: `The learner ${learnerUUID} is not registered on the quiz ${quizId}`,
                  };
                }
                return data;
              },
          ).
          catch(error => {
            throw error;
          });
    };

module.exports = {
  assertIsFound,
  errorHandler,
  assertIsOwner,
  assertLearnerIsRegisteredOnQuiz,
};