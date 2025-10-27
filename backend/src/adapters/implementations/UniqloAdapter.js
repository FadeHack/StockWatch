const BrandAdapter = require('../interface/BrandAdapter');

class UniqloAdapter extends BrandAdapter {
  // --- METADATA ---
  brandId = 'uniqlo';
  brandName = 'UNIQLO';
  stores = [
    { id: 'store-london-regent', name: 'London (Regent Street)' },
    { id: 'store-tokyo-ginza', name: 'Tokyo (Ginza)' },
  ];

  // --- STORE-SPECIFIC MOCK DATA ---
  mockInventories = {
    'store-london-regent': [
      { productCode: '450334', name: 'AIRism Cotton Crew Neck T-Shirt', size: 'L', quantity: 50, available: true },
      { productCode: '450335', name: 'AIRism Cotton Crew Neck T-Shirt', size: 'M', quantity: 30, available: true },
      { productCode: '459701', name: 'Pleated Wide Pants', size: 'M', quantity: 12, available: true },
      { productCode: '463421', name: 'UV Protection Pocketable Parka', size: 'L', quantity: 21, available: true },
      { productCode: '455493', name: 'HEATTECH Crew Neck T-Shirt', size: 'L', quantity: 110, available: true },
    ],
    'store-tokyo-ginza': [
      { productCode: '450336', name: 'AIRism Cotton Crew Neck T-Shirt', size: 'S', quantity: 75, available: true },
      { productCode: '450337', name: 'AIRism Cotton Crew Neck T-Shirt', size: 'XL', quantity: 9, available: true },
      { productCode: '459700', name: 'Pleated Wide Pants', size: 'S', quantity: 0, available: false },
      { productCode: '463422', name: 'UV Protection Pocketable Parka', size: 'M', quantity: 7, available: true },
      { productCode: '460920', name: 'Souffle Yarn Long Sleeve Sweater', size: 'M', quantity: 19, available: true },
      { productCode: '457223', name: 'Miracle Air Jeans', size: '32', quantity: 25, available: true },
    ],
  };

  async fetchInventory(storeId) {
    console.log(`Fetching Uniqlo inventory for store: ${storeId}`);

    // 1. Look up the correct base inventory.
    const baseInventory = this.mockInventories[storeId] || [];

    // 2. Add randomization.
    const randomizedInventory = baseInventory.map(item => ({
      ...item,
      quantity: Math.floor(Math.random() * 80), // Random stock between 0 and 79
    }));

    // Update the 'available' flag based on the new random quantity
    const finalInventory = randomizedInventory.map(item => ({
      ...item,
      available: item.quantity > 0,
    }));

    return Promise.resolve(finalInventory);
  }
}

module.exports = new UniqloAdapter();