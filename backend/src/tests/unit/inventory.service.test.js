const inventoryService = require('../../services/inventory.service');
const inventoryRepository = require('../../repositories/inventory.repository');
const HnMAdapter = require('../../adapters/implementations/HnMAdapter');
const UniqloAdapter = require('../../adapters/implementations/UniqloAdapter');

// Mock the modules that the service depends on
jest.mock('../../repositories/inventory.repository');
jest.mock('../../adapters/implementations/HnMAdapter');
jest.mock('../../adapters/implementations/UniqloAdapter');
jest.mock('../../utils/logger'); // Also mock the logger to keep test output clean

describe('Inventory Service', () => {
  // Clear mock history after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInventory', () => {
    it('should call the repository with the correct brand and storeId', async () => {
      const brand = 'hm';
      const storeId = '123';
      inventoryRepository.findLatestByStore.mockResolvedValue([]); // Mock the return value

      await inventoryService.getInventory(brand, storeId);

      expect(inventoryRepository.findLatestByStore).toHaveBeenCalledTimes(1);
      expect(inventoryRepository.findLatestByStore).toHaveBeenCalledWith(brand, storeId);
    });

    it('should throw an error for an invalid brand', async () => {
      const brand = 'zara';
      const storeId = '123';

      // Test that the promise rejects with a specific error
      await expect(inventoryService.getInventory(brand, storeId)).rejects.toThrow(
        `Invalid brand specified: ${brand}`
      );
    });
  });

  describe('refreshInventory', () => {
    it('should call the H&M adapter and map its data correctly to the repository', async () => {
      const brand = 'hm';
      const storeId = '456';

      const mockApiResponse = [
        { item_sku: '0987123', name: 'Hoodie', item_size: 'M', stock: 15, color: 'Black' },
      ];
      HnMAdapter.fetchInventory.mockResolvedValue(mockApiResponse);
      inventoryRepository.createSnapshots.mockResolvedValue([]);

      await inventoryService.refreshInventory(brand, storeId);

      expect(HnMAdapter.fetchInventory).toHaveBeenCalledWith(storeId);

      // Expect the repository to be called with the correctly transformed, canonical data
      const expectedCanonicalData = [{
        sku: '0987123',
        product_name: 'Hoodie',
        size: 'M',
        color: 'Black',
        quantity: 15,
        is_available: true,
        brand: 'hm',
        store_id: '456',
      }];
      expect(inventoryRepository.createSnapshots).toHaveBeenCalledWith(expectedCanonicalData);
    });
  });
});