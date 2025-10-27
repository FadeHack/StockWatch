const express = require('express');
const brandsController = require('../controllers/brands.controller');

const router = express.Router();

router.get('/', brandsController.getBrands);
router.get('/:brandId/stores', brandsController.getStoresByBrand);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API for retrieving brand and store metadata
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Retrieve a list of all available brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of brands was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "hm"
 *                       name:
 *                         type: string
 *                         example: "H&M"
 */

/**
 * @swagger
 * /brands/{brandId}/stores:
 *   get:
 *     summary: Retrieve a list of stores for a specific brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the brand (e.g., 'hm')
 *     responses:
 *       200:
 *         description: A list of stores was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "store-nyc-5th-ave"
 *                       name:
 *                         type: string
 *                         example: "New York (5th Ave)"
 *       404:
 *         description: The specified brand was not found.
 */