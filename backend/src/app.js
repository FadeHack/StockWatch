const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); // Import
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const apiRoutes = require('./api/routes');
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();

// --- Core Middlewares ---
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiting middleware to API calls
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // e.g., 15 minutes
  max: config.rateLimit.max, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', limiter); // Apply limiter to all /api routes


// --- API Routes ---
app.use('/api', apiRoutes);


// --- Error Handling ---
app.use(errorHandler);

module.exports = app;