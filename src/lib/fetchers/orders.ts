'use server';

import { db } from '~/db';
import { and, desc, eq } from 'drizzle-orm';

import { orders } from '~/db/schema';
import { auth } from '~/lib/actions/auth';

export async function getOrder(code: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return db.query.orders.findFirst({
    where: and(eq(orders.userId, session.id), eq(orders.code, code)),
    columns: {
      id: true,
      code: true,
      grandTotal: true,
      createdAt: true,
    },
    with: {
      orderStatuses: {
        columns: {
          status: true,
        },
        orderBy: desc(orders.createdAt),
      },
      orderProducts: {
        columns: {
          price: true,
          quantity: true,
        },
        with: {
          size: {
            columns: {
              title: true,
            },
          },
          color: {
            columns: {
              title: true,
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
      },
    },
    orderBy: desc(orders.createdAt),
  });
}

export type Order = Awaited<ReturnType<typeof getOrder>>;

export async function getOrders() {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return db.query.orders.findMany({
    where: eq(orders.userId, session.id),
    columns: {
      id: true,
      code: true,
      grandTotal: true,
      createdAt: true,
    },
    with: {
      orderStatuses: {
        columns: {
          status: true,
        },
        orderBy: desc(orders.createdAt),
      },
    },
    orderBy: desc(orders.createdAt),
  });
}
