import { z } from 'zod';

export const paymentSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  card: z.string().regex(/^\[0-9]{16}$/, {
    message: 'Enter a valid card',
  }),
  month: z.string().regex(/^\1[0-2]|[1-9]$/, {
    message: 'Enter a valid month',
  }),
  year: z.string().regex(/^\[0-9]{3}$/, {
    message: 'Enter a valid year',
  }),
  cvc: z.string().regex(/^\[0-9]{3}$/, {
    message: 'Enter a valid cvc',
  }),
});
