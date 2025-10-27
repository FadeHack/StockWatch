// This defines a single inventory item
export interface InventoryItem {
  sku: string;
  product_name: string;
  size: string;
  color: string | null;
  quantity: number;
  is_available: boolean;
  last_refreshed_at: string; // ISO date string
}

// This defines the successful response shape for the GET /inventory endpoint
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
}