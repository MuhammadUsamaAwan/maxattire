import { z } from 'zod';

export const addReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(1),
  productId: z.number().min(1),
  orderProductId: z.number().min(1),
});
