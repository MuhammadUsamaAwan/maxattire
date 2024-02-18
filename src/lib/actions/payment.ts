'use server';

import { revalidateTag } from 'next/cache';
import { db } from '~/db';
import { type z } from 'zod';

import { auth } from '~/lib/actions/auth';
import { addAddressSchema } from '~/lib/validations/addresses';
import { paymentSchema } from '~/lib/validations/payment';

export async function payment(rawInput: z.infer<typeof paymentSchema>) {
  const { name, card, cvc, month, year } = rawInput;
  const session = await auth();
}
