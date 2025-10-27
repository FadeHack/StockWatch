const inventoryService = require('../../services/inventory.service'); // Import the service

const brandsController = {
  getBrands(req, res) {
    const brands = inventoryService.getAllBrands();
    res.status(200).json({ success: true, data: brands });
  },

  getStoresByBrand(req, res) {
    const { brandId } = req.params;
    const stores = inventoryService.getStoresForBrand(brandId);

    if (!stores) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    res.status(200).json({ success: true, data: stores });
  },
};

module.exports = brandsController;