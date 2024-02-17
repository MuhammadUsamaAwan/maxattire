'use server';

import { revalidateTag } from 'next/cache';
import { db } from '~/db';
import { type z } from 'zod';

import { addresses } from '~/db/schema';
import { auth } from '~/lib/actions/auth';
import { addAddressSchema } from '~/lib/validations/addresses';

export async function addAddress(rawInput: z.infer<typeof addAddressSchema>) {
  const { address, city, state, postalCode, phone } = addAddressSchema.parse(rawInput);
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  const [newAddress] = await db.insert(addresses).values({
    address,
    city,
    state,
    postalCode,
    phone,
    userId: session.id,
  });
  revalidateTag('address');
  return newAddress.insertId;
}
