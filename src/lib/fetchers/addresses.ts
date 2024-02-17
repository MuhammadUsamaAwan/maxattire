'use server';

import { db } from '~/db';
import { desc, eq } from 'drizzle-orm';

import { addresses } from '~/db/schema';
import { auth } from '~/lib/actions/auth';

export async function getAddresses() {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return db.query.addresses.findMany({
    where: eq(addresses.userId, session.id),
    columns: {
      id: true,
      address: true,
      city: true,
      state: true,
      postalCode: true,
      phone: true,
    },
    orderBy: desc(addresses.createdAt),
  });
}

export type Addresses = Awaited<ReturnType<typeof getAddresses>>;
