import { useEffect } from 'react';
import { BrandStoreSelector } from '@/components/features/BrandStoreSelector';
import { InventoryTable } from '@/components/features/InventoryTable';
import { StatusDisplay } from '@/components/features/StatusDisplay';
import { useInventoryStore } from '@/store/inventoryStore';

export function InventoryPage() {
  const {
    selectedBrand,
    selectedStore,
    inventory,
    isLoading,
    error,
    lastRefreshedAt,
    brands,
    stores,
    isMetaLoading,
    setBrand,
    setStore,
    fetchInventory,
    fetchBrands,
  } = useInventoryStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
      {/* --- LEFT COLUMN - Takes less space --- */}
      <div className="xl:col-span-1 space-y-6 xl:sticky xl:top-28">
        <BrandStoreSelector
          selectedBrand={selectedBrand}
          onBrandChange={setBrand}
          selectedStore={selectedStore}
          onStoreChange={setStore}
          onSubmit={fetchInventory}
          isLoading={isLoading || isMetaLoading}
          brands={brands}
          stores={stores}
        />
        <StatusDisplay
          error={error}
          lastRefreshedAt={lastRefreshedAt}
          key={lastRefreshedAt}
        />
      </div>

      {/* --- RIGHT COLUMN - Takes most of the space --- */}
      <div className="xl:col-span-3">
        <InventoryTable inventory={inventory} isLoading={isLoading} />
      </div>
    </div>
  );
}