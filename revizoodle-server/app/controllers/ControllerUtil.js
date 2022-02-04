/**
 * Default error handler for http response
 * @param httpResponse the httpResponse provided by the controller to prepare
 * the response
 */
const errorHandler = (httpResponse) => (error) => {
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
const assertIsFound = (notFoundMessage) =>  (data) => {

      if (!data) {
        throw {
          statusCode: 404,
          message: notFoundMessage
        }
      }

      return data;
    };

module.exports = {
  assertIsFound,
  errorHandler,
};