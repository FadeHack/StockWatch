import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { type InventoryItem } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, AlertCircle } from 'lucide-react';

type InventoryTableProps = {
  inventory: InventoryItem[];
  isLoading: boolean;
};

const TableSkeleton = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <motion.tr
        key={`skeleton-${i}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: i * 0.05 }}
        className="border-b border-white/5"
      >
        <TableCell className="py-5">
          <Skeleton className="h-5 w-24 bg-slate-700/50" />
        </TableCell>
        <TableCell className="py-5">
          <Skeleton className="h-5 w-full max-w-md bg-slate-700/50" />
        </TableCell>
        <TableCell className="py-5">
          <Skeleton className="h-5 w-16 bg-slate-700/50" />
        </TableCell>
        <TableCell className="py-5 text-right">
          <Skeleton className="h-5 w-12 bg-slate-700/50 ml-auto" />
        </TableCell>
      </motion.tr>
    ))}
  </>
);

const EmptyStateRow = () => (
  <motion.tr
    key="empty"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    <TableCell colSpan={4} className="h-96">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-6 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl">
          <Package className="h-16 w-16 text-blue-400/50" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-slate-300">No Inventory Data</p>
          <p className="text-slate-500">Select a brand and store to view inventory levels</p>
        </div>
      </div>
    </TableCell>
  </motion.tr>
);

export function InventoryTable({ inventory, isLoading }: InventoryTableProps) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-white/10 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Inventory Overview
            </h2>
            <p className="text-sm text-slate-400">
              {inventory.length > 0 ? `${inventory.length} items in stock` : 'Awaiting data'}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-4">SKU</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-4">Product Name</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-4">Size</TableHead>
              <TableHead className="text-right text-slate-400 font-semibold text-xs uppercase tracking-wider py-4">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <TableSkeleton />
              ) : inventory.length > 0 ? (
                inventory.map((item, index) => (
                  <motion.tr
                    key={item.sku}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="border-b border-white/5 hover:bg-slate-800/50 transition-colors duration-200 group"
                  >
                    <TableCell className="font-mono text-sm text-blue-400 py-5">
                      {item.sku}
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="text-slate-200 group-hover:text-white transition-colors duration-200">
                        {item.product_name}
                      </span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-white/10">
                        {item.size}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-5">
                      <div className="flex items-center justify-end gap-2">
                        {item.quantity < 10 && (
                          <AlertCircle className="h-4 w-4 text-orange-400" />
                        )}
                        <span
                          className={`font-bold text-lg ${
                            item.quantity < 10
                              ? 'text-orange-400'
                              : item.quantity < 50
                              ? 'text-yellow-400'
                              : 'text-green-400'
                          }`}
                        >
                          {item.quantity}
                        </span>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <EmptyStateRow />
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}