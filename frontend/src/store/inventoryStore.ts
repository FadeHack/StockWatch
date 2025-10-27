import { create } from 'zustand';
import { toast } from 'sonner';
import { type InventoryItem, type Brand, type Store } from '@/lib/types';
import * as inventoryService from '@/services/inventoryService';

// Define the shape of our state
interface InventoryState {
  selectedBrand: string;
  selectedStore: string;
  inventory: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  lastRefreshedAt: string | null;
  brands: Brand[];
  stores: Store[];
  isMetaLoading: boolean; // For loading brands/stores
}

// Define the actions that can modify our state
interface InventoryActions {
  setBrand: (brand: string) => void;
  setStore: (store: string) => void;
  fetchInventory: () => Promise<void>;
  fetchBrands: () => Promise<void>;
  fetchStores: (brandId: string) => Promise<void>;
}

// Combine state and actions into a single type for the store
type InventoryStore = InventoryState & InventoryActions;

// Create the store with an initial state and the actions
export const useInventoryStore = create<InventoryStore>((set, get) => ({
  // --- STATE ---
  selectedBrand: '',
  selectedStore: '',
  inventory: [],
  isLoading: false,
  error: null,
  lastRefreshedAt: null,
  brands: [],
  stores: [],
  isMetaLoading: false,

  // --- ACTIONS ---
  setBrand: (brand: string) => {
    set({
      selectedBrand: brand,
      selectedStore: '',
      inventory: [],
      lastRefreshedAt: null,
    });
    get().fetchStores(brand);
  },

  setStore: (store: string) => set({ selectedStore: store }),

  fetchBrands: async () => {
    set({ isMetaLoading: true });
    try {
      const brands = await inventoryService.getBrands();
      set({ brands, isMetaLoading: false });
    } catch (err) {
      console.error('Failed to fetch brands:', err);
      toast.error('Initialization Failed', {
        description: 'Could not load app configuration.',
      });
      set({ error: 'Failed to load app configuration.', isMetaLoading: false });
    }
  },

  fetchStores: async (brandId: string) => {
    if (!brandId) return;
    set({ isMetaLoading: true, stores: [] });
    try {
      const stores = await inventoryService.getStores(brandId);
      set({ stores, isMetaLoading: false });
    } catch (err) {
      console.error('Failed to fetch stores:', err);
      toast.error('Failed to load stores', {
        description: 'Could not load stores for the selected brand.',
      });
      set({ error: 'Failed to load stores for this brand.', isMetaLoading: false });
    }
  },

  fetchInventory: async () => {
    const { selectedBrand, selectedStore } = get();

    if (!selectedBrand || !selectedStore) return;

    set({ isLoading: true, error: null });
    const toastId = toast.loading('Fetching latest inventory...');

    try {
      await inventoryService.triggerFetch(selectedBrand, selectedStore);
      const newInventory = await inventoryService.getLatestInventory(
        selectedBrand,
        selectedStore
      );

      set({
        inventory: newInventory,
        isLoading: false,
        lastRefreshedAt:
          newInventory[0]?.last_refreshed_at || new Date().toISOString(),
      });

      toast.success('Inventory Updated!', {
        id: toastId,
        description: `Found ${newInventory.length} item types.`,
      });
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      set({
        error: 'Failed to fetch inventory data. Please try again.',
        isLoading: false,
      });

      toast.error('Failed to Fetch Inventory', {
        id: toastId,
        description: 'Please check your connection and try again.',
      });
    }
  },
}));