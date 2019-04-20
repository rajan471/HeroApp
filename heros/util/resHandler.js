const responseType = require('./responseType');
const cusError = require('./cusError');
const logger = require('./logger');

const errorResponse = (message, correlation_id) => {
  return {
    success: false,
    message,
    module: 'driver',
    correlation_id
  }
}

const successResponse = (message, data, count, search, correlation_id) => {
  let response = {
    success: true,
    message,
    data,
    correlation_id
  };
  if (!isNaN(count)) response.count = count;
  if (!!search) response.search = search;
  return response;
}
const sendError = (req, res, error) => {
  let code = error.code ? error.code : 500;
  res.status(code)
    .json(errorResponse(error.message, req.headers['correlation_id']));
}

const sendData = (req, res, result) => {
  res.status(result.code)
    .json(successResponse(result.message, result.data, req.headers['correlation_id']));
}

const handleError = (error, req, res, next) => {
  try {
    if (!error.code) {
      throw new cusError(responseType.INTERNAL_SERVER_ERROR, error.message || 'Something not right. It is internal server error.')
    }
    if (!!error.code) {
      switch (error.code) {
        case 13: throw new cusError(responseType.UNAUTHORIZED, 'User not authorized to access database');
        case 18: throw new cusError(responseType.BAD_REQUEST, 'Authentication failed for database');
        case 14: throw new cusError(responseType.BAD_REQUEST, 'Type mismatch');
        case 22: throw new cusError(responseType.BAD_REQUEST, 'BSON Object is Invalid');
        case 27: throw new cusError(responseType.BAD_REQUEST, 'Mongo Index not found.');
        case 30: throw new cusError(responseType.NOT_ACCEPTABLE, 'Improper data (Path is invalid)');
        case 60: throw new cusError(responseType.INTERNAL_SERVER_ERROR, 'Database not found');
        case 121: throw new cusError(responseType.INTERNAL_SERVER_ERROR, 'Can\'t be saved in DB. Mongo Document validation failure');
        case 11000: throw new cusError(responseType.NOT_ACCEPTABLE, 'Phone and Email should be unique.');
      }
    }
    sendError(req, res, error);
    logger.error(error);
  }
  catch (error) {
    sendError(req, res, error);
    logger.error(error);
  }
};
const handleUncaughtError = (error) => {
  logger.error(error);
}
module.exports = {
  handleError,
  handleUncaughtError,
  sendData
};
