const express = require('express');
const inventoryRoutes = require('./inventory.routes');
const brandRoutes = require('./brands.routes');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// All inventory-related routes will be prefixed with /inventory
router.use('/inventory', inventoryRoutes);

router.use('/brands', brandRoutes); 

module.exports = router;