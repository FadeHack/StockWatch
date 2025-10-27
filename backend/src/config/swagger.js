const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real-Time Store Inventory API',
      version: '1.0.0',
      description: 'An API to fetch and display real-time inventory from various brands.',
    },
    servers: [{ url: '/api' }],
  },
  // Path to the API docs files
  apis: [path.join(__dirname, '../api/routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;