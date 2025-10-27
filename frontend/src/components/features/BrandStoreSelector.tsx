import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Tags, Building, Sparkles } from 'lucide-react';
import { type Brand, type Store } from '@/lib/types';

type BrandStoreSelectorProps = {
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  selectedStore: string;
  onStoreChange: (store: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  brands: Brand[];
  stores: Store[];
};

export function BrandStoreSelector({
  selectedBrand,
  onBrandChange,
  selectedStore,
  onStoreChange,
  onSubmit,
  isLoading,
  brands,
  stores,
}: BrandStoreSelectorProps) {
  return (
    <Card className="w-full shadow-2xl shadow-blue-500/10 border-white/10 bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      
      <CardHeader className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-2xl bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Inventory Checker
          </CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Select a brand and store to fetch real-time inventory data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 relative">
        <div className="space-y-3">
          <label htmlFor="brand-select" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Tags className="h-4 w-4 text-blue-400" />
            Brand
          </label>
          <Select
            value={selectedBrand}
            onValueChange={onBrandChange}
            disabled={isLoading}
          >
            <SelectTrigger 
              id="brand-select" 
              className="h-12 border-white/10 bg-slate-800/50 hover:bg-slate-800/70 hover:border-blue-400/50 transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-blue-400" />
                <SelectValue placeholder="Select a brand..." className="text-slate-200" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-slate-900 backdrop-blur-xl">
              {brands.map((brand) => (
                <SelectItem 
                  key={brand.id} 
                  value={brand.id}
                  className="hover:bg-slate-700 focus:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label htmlFor="store-select" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Building className="h-4 w-4 text-purple-400" />
            Store
          </label>
          <Select
            value={selectedStore}
            onValueChange={onStoreChange}
            disabled={isLoading || stores.length === 0}
          >
            <SelectTrigger 
              id="store-select"
              className="h-12 border-white/10 bg-slate-800/50 hover:bg-slate-800/70 hover:border-purple-400/50 transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 text-slate-200"
            >
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-400" />
                <SelectValue placeholder="Select a store..." className="text-slate-200" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-slate-900 backdrop-blur-xl">
              {stores.map((store) => (
                <SelectItem 
                  key={store.id} 
                  value={store.id}
                  className="hover:bg-slate-700 focus:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onSubmit}
          disabled={isLoading || !selectedBrand || !selectedStore}
          className="w-full h-12 font-bold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : null}
          <span className="relative z-10">{isLoading ? 'Fetching...' : 'Fetch Inventory'}</span>
        </Button>
      </CardContent>
    </Card>
  );
}