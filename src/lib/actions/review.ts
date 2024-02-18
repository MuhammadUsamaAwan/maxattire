'use server';

import { revalidateTag } from 'next/cache';
import { db } from '~/db';
import { and, desc, eq } from 'drizzle-orm';
import { type z } from 'zod';

import { orderProducts, orders, orderStatuses, reviews } from '~/db/schema';
import { auth } from '~/lib/actions/auth';

import { addReviewSchema } from '../validations/review';

export async function addReview(rawInput: z.infer<typeof addReviewSchema>) {
  const { rating, review, productId, orderProductId } = addReviewSchema.parse(rawInput);
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  const order = await db.query.orders.findFirst({
    where: and(eq(orders.userId, session.id), eq(orderProducts.id, orderProductId)),
    columns: {
      id: true,
    },
    with: {
      orderProducts: {
        columns: {
          id: true,
        },
      },
      orderStatuses: {
        columns: {
          status: true,
        },
        orderBy: desc(orderStatuses.createdAt),
      },
    },
  });
  if (order?.orderStatuses.some(status => status.status === 'PAID')) {
    throw new Error('Order not paid');
  }
  const alreadyReviewed = await db.query.reviews.findFirst({
    where: and(
      eq(reviews.orderProductId, orderProductId),
      eq(reviews.productId, productId),
      eq(reviews.userId, session.id)
    ),
    columns: {
      id: true,
    },
  });
  if (alreadyReviewed) {
    throw new Error('Already reviewed');
  }
  await db.insert(reviews).values({
    reviewType: 'PRODUCT',
    userId: session.id,
    orderProductId,
    productId,
    rating,
    status: 'PENDING',
    review,
  });
  revalidateTag('review');
}
