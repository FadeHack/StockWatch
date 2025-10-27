const config = require('../../config');
const logger = require('../../utils/logger');

// This middleware should be the last `app.use()`
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'An unexpected error occurred.';

  // Log the full error for debugging purposes
  logger.error(err.message, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Send a generic, user-friendly response to the client
  // In development, we can send back more details
  const response = {
    success: false,
    message: errorMessage,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;