const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');
const db = require('./db'); // Import the database pool

const server = app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
});

const gracefulShutdown = () => {
  logger.info('Received shutdown signal, shutting down gracefully...');
  server.close(() => {
    logger.info('HTTP server closed.');
    // Close the database connection pool
    db.pool.end(() => {
      logger.info('Database connection pool closed.');
      process.exit(0);
    });
  });
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown); // e.g., from Docker
process.on('SIGINT', gracefulShutdown); // e.g., from Ctrl+C