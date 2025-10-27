const winston = require('winston');
const config = require('../config');

const { combine, timestamp, printf, colorize, json } = winston.format;

const devLogFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
);

const logger = winston.createLogger({
  level: config.nodeEnv === 'development' ? 'debug' : 'info',
  format:
    config.nodeEnv === 'development'
      ? combine(
          colorize(),
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          devLogFormat
        )
      : combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});

module.exports = logger;