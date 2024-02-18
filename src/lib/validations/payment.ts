import { z } from 'zod';

export const paymentSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  card: z.string().regex(/[0-9]{16}/, {
    message: 'Enter a valid card',
  }),
  expiry: z.string().regex(/[0-9]{4}/, {
    message: 'Enter a valid expiry date',
  }),
  cvc: z.string().regex(/[0-9]{3}/, {
    message: 'Enter a valid cvc',
  }),
});
