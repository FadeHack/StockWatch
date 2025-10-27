class BrandAdapter {
  /**
   * Fetches inventory data for a specific store.
   * @param {string} storeId - The unique identifier for the store.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of inventory items.
   */
  async fetchInventory(storeId) {
    throw new Error('fetchInventory() must be implemented by concrete adapter');
  }
}

module.exports = BrandAdapter;