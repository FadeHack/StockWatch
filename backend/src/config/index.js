const dotenv = require('dotenv');
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  corsOrigin: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  rateLimit: {
    windowMs: (process.env.RATE_LIMIT_WINDOW_MS || 15) * 60 * 1000, // in minutes
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  },
};

module.exports = config;