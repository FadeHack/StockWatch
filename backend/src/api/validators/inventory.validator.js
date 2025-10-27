const { z } = require('zod');

const inventoryQuerySchema = z.object({
  query: z.object({
    brand: z.string({ invalid_type_error: 'Brand is required' }).min(1, { message: 'Brand is required' }),
    storeId: z.string({ invalid_type_error: 'Store ID is required' }).min(1, { message: 'Store ID is required' }),
  }),
});

const inventoryFetchSchema = z.object({
  body: z.object({
    brand: z.string({ invalid_type_error: 'Brand is required' }).min(1, { message: 'Brand is required' }),
    storeId: z.string({ invalid_type_error: 'Store ID is required' }).min(1, { message: 'Store ID is required' }),
  }),
});

module.exports = {
  inventoryQuerySchema,
  inventoryFetchSchema,
};