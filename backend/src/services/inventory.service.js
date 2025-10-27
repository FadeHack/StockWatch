const HnMAdapter = require('../adapters/implementations/HnMAdapter');
const UniqloAdapter = require('../adapters/implementations/UniqloAdapter');
const inventoryRepository = require('../repositories/inventory.repository');
const logger = require('../utils/logger');

// The SINGLE SOURCE OF TRUTH for the entire application.
const brandAdapters = {
  hm: HnMAdapter,
  uniqlo: UniqloAdapter,
};

const inventoryService = {
  // --- Metadata Methods ---
  getAllBrands() {
    return Object.values(brandAdapters).map(adapter => ({
      id: adapter.brandId,
      name: adapter.brandName,
    }));
  },

  getStoresForBrand(brandId) {
    const adapter = brandAdapters[brandId.toLowerCase()];
    if (!adapter) {
      return null; // Or throw an error
    }
    return adapter.stores;
  },

  // --- Core Inventory Methods ---
  async getInventory(brand, storeId) {
    const adapter = brandAdapters[brand.toLowerCase()];
    if (!adapter) {
      throw new Error(`Invalid brand specified: ${brand}`);
    }
    return inventoryRepository.findLatestByStore(brand, storeId);
  },

  async refreshInventory(brand, storeId) {
    const adapter = brandAdapters[brand.toLowerCase()];
    if (!adapter) {
      throw new Error(`Invalid brand specified: ${brand}`);
    }
    logger.info(`Refreshing inventory for brand: ${brand}, storeId: ${storeId}`);

    const rawInventory = await adapter.fetchInventory(storeId);

    const canonicalInventory = rawInventory.map(item => ({
      sku: item.item_sku || item.productCode,
      product_name: item.name,
      size: item.item_size || item.size,
      color: item.color || null,
      quantity: item.stock || item.quantity,
      is_available: item.available !== undefined ? item.available : (item.stock || item.quantity) > 0,
      brand: brand,
      store_id: storeId,
    }));

    return inventoryRepository.createSnapshots(canonicalInventory);
  },
};

module.exports = inventoryService;