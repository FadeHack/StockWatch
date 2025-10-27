const inventoryService = require('../../services/inventory.service');

const inventoryController = {
  async getInventory(req, res, next) {
    try {
      const { brand, storeId } = req.query;
      const inventory = await inventoryService.getInventory(brand, storeId);
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error); // Pass error to the centralized error handler
    }
  },

  async refreshInventory(req, res, next) {
    try {
      const { brand, storeId } = req.body;
      await inventoryService.refreshInventory(brand, storeId);
      res.status(202).json({
        success: true,
        message: `Inventory fetch triggered for brand: ${brand}, store: ${storeId}.`,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = inventoryController;