import { z } from 'zod';

export const addAddressSchema = z.object({
  phone: z.string(),
  address: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string(),
});
