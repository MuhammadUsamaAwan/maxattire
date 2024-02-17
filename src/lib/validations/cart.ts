import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.number().min(1),
  productStockId: z.number().min(1),
  quantity: z.number().min(1),
});

export const updateCartItemSchema = z.object({
  id: z.number().min(1),
  quantity: z.number().min(1),
});

export const removeCartItemSchema = z.object({
  id: z.number().min(1),
});
