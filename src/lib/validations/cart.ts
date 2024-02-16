import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.number().min(1),
  productStockId: z.number().min(1),
  quantity: z.number().min(1),
});
