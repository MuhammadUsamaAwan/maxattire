'use server';

import { db } from '~/db';
import { eq } from 'drizzle-orm';

import { carts } from '~/db/schema';
import { auth } from '~/lib/actions/auth';

export async function getCartCount() {
  const session = await auth();
  if (!session) {
    return 0;
  }
  const cart = await db.query.carts.findMany({
    where: eq(carts.userId, session.id),
    columns: {
      id: true,
    },
  });
  return cart.length;
}

export async function getCart() {
  const session = await auth();
  if (!session) {
    return [];
  }
  return db.query.carts.findMany({
    where: eq(carts.userId, session.id),
    columns: {
      id: true,
      quantity: true,
    },
    with: {
      productStock: {
        with: {
          size: {
            columns: {
              title: true,
            },
          },
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      product: {
        columns: {
          title: true,
          slug: true,
          thumbnail: true,
        },
      },
    },
  });
}

export type CartItems = Awaited<ReturnType<typeof getCart>>;
