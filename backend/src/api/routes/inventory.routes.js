const express = require('express');
const inventoryController = require('../controllers/inventory.controller');
const validateRequest = require('../middlewares/validateRequest');
const {
  inventoryQuerySchema,
  inventoryFetchSchema,
} = require('../validators/inventory.validator');

const router = express.Router();

// GET /api/inventory?brand=hm&storeId=123
router.get(
  '/',
  validateRequest(inventoryQuerySchema),
  inventoryController.getInventory
);

// POST /api/inventory/fetch
// body: { "brand": "hm", "storeId": "123" }
router.post(
  '/fetch',
  validateRequest(inventoryFetchSchema),
  inventoryController.refreshInventory
);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API for inventory management
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Retrieve the latest inventory snapshot for a store
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema: { type: string }
 *         required: true
 *         description: The brand identifier (e.g., hm, uniqlo)
 *       - in: query
 *         name: storeId
 *         schema: { type: string }
 *         required: true
 *         description: The store identifier
 *     responses:
 *       200:
 *         description: Successful response with inventory data.
 *       400:
 *         description: Validation error for request parameters.
 */

/**
 * @swagger
 * /inventory/fetch:
 *   post:
 *     summary: Trigger an on-demand refresh for a store's inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 example: "uniqlo"
 *               storeId:
 *                 type: string
 *                 example: "store-nyc-5th-ave"
 *     responses:
 *       202:
 *         description: The fetch request has been accepted for processing.
 *       400:
 *         description: Validation error for request body.
 */