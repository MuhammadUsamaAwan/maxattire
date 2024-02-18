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
      },
      orderProducts: {
        columns: {
          id: true,
          price: true,
          quantity: true,
        },
        with: {
          productStock: {
            columns: {
              id: true,
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
            },
          },
          product: {
            columns: {
              id: true,
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
      },
    },
    orderBy: desc(orders.createdAt),
  });
}

export async function getUnPaidOrder(id: number) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  const order = await db.query.orders.findFirst({
    where: and(eq(orders.userId, session.id), eq(orders.id, id)),
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
      },
      orderProducts: {
        columns: {
          id: true,
          price: true,
          quantity: true,
        },
        with: {
          productStock: {
            columns: {
              id: true,
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
            },
          },
          product: {
            columns: {
              id: true,
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
  const paid = order?.orderStatuses.some(status => status.status === 'PAID');
  return paid ? null : order;
}
