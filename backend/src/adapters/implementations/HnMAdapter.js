const BrandAdapter = require('../interface/BrandAdapter');

class HnMAdapter extends BrandAdapter {
  // --- METADATA ---
  brandId = 'hm';
  brandName = 'H&M';
  stores = [
    { id: 'store-nyc-5th-ave', name: 'New York (5th Ave)' },
    { id: 'store-stockholm-1', name: 'Stockholm (City Center)' },
  ];

  // --- STORE-SPECIFIC MOCK DATA ---
  mockInventories = {
    'store-nyc-5th-ave': [
      { item_sku: '0987123', name: 'Relaxed Fit Hoodie', item_size: 'M', stock: 15, color: 'Black' },
      { item_sku: '0987124', name: 'Relaxed Fit Hoodie', item_size: 'L', stock: 5, color: 'Black' },
      { item_sku: '0567333', name: 'Straight Leg Jeans', item_size: '32/32', stock: 22, color: 'Denim Blue' },
      { item_sku: '1123456', name: 'Regular Fit T-shirt', item_size: 'M', stock: 58, color: 'White' },
      { item_sku: '2233445', name: 'Cotton Twill Cap', item_size: 'One Size', stock: 18, color: 'Khaki Green' },
    ],
    'store-stockholm-1': [
      { item_sku: '0987125', name: 'Relaxed Fit Hoodie', item_size: 'S', stock: 25, color: 'Light Beige' },
      { item_sku: '0567334', name: 'Straight Leg Jeans', item_size: '30/32', stock: 8, color: 'Washed Black' },
      { item_sku: '1123457', name: 'Regular Fit T-shirt', item_size: 'L', stock: 34, color: 'White' },
      { item_sku: '1123458', name: 'Regular Fit T-shirt', item_size: 'M', stock: 41, color: 'Dark Blue' },
      { item_sku: '3344556', name: 'Oversized Printed T-shirt', item_size: 'L', stock: 11, color: 'Black/Nirvana' },
      { item_sku: '4455667', name: 'Slim Fit Blazer', item_size: '40R', stock: 7, color: 'Dark Grey' },
    ],
  };

  async fetchInventory(storeId) {
    console.log(`Fetching H&M inventory for store: ${storeId}`);
    
    // 1. Look up the correct base inventory for the requested store. Default to empty array.
    const baseInventory = this.mockInventories[storeId] || [];

    // 2. Add randomization to the stock count to simulate real-time changes.
    const randomizedInventory = baseInventory.map(item => ({
      ...item,
      stock: Math.floor(Math.random() * 50) + 1, // Random stock between 1 and 50
    }));

    return Promise.resolve(randomizedInventory);
  }
}

module.exports = new HnMAdapter();