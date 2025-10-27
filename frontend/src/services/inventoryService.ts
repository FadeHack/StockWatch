import apiClient from '@/lib/axios';
import { type InventoryItem, type ApiResponse, type Brand, type Store  } from '@/lib/types';

/**
 * Triggers the backend to start a new inventory fetch process.
 * Corresponds to POST /api/inventory/fetch
 * @param brand - The brand identifier (e.g., "hm")
 * @param storeId - The store identifier (e.g., "store-nyc-5th-ave")
 */
export const triggerFetch = async (
  brand: string,
  storeId: string
): Promise<void> => {
  await apiClient.post('/inventory/fetch', { brand, storeId });
};

/**
 * Retrieves the latest inventory snapshot from the backend.
 * Corresponds to GET /api/inventory
 * @param brand - The brand identifier
 * @param storeId - The store identifier
 * @returns A promise that resolves to an array of inventory items.
 */
export const getLatestInventory = async (
  brand: string,
  storeId: string
): Promise<InventoryItem[]> => {
  const response = await apiClient.get<ApiResponse<InventoryItem[]>>(
    '/inventory',
    {
      params: { brand, storeId },
    }
  );
  return response.data.data; // We extract the nested 'data' array from the API response
};


export const getBrands = async (): Promise<Brand[]> => {
  const response = await apiClient.get<ApiResponse<Brand[]>>('/brands');
  return response.data.data;
};

export const getStores = async (brandId: string): Promise<Store[]> => {
  const response = await apiClient.get<ApiResponse<Store[]>>(`/brands/${brandId}/stores`);
  return response.data.data;
};