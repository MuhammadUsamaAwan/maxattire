'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { products, reviews, users } from '~/db/schema';
import { auth } from '~/lib/actions/auth';

export async function getProductReviews(slug: string) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(products.slug, slug), isNull(products.deletedAt), eq(products.status, 'active')),
  });
  if (!product) return [];
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      review: reviews.review,
      createdAt: reviews.createdAt,
      user: {
        id: users.id,
        name: users.name,
        image: users.image,
      },
    })
    .from(reviews)
    .leftJoin(users, and(eq(reviews.userId, users.id), eq(reviews.productId, product.id), isNull(reviews.deletedAt)));
}

export type ProductReviews = Awaited<ReturnType<typeof getProductReviews>>;

export async function getReview(orderProductId: number, productId: number) {
  const session = await auth();
  if (!session) return null;
  return db.query.reviews.findFirst({
    where: and(
      eq(reviews.orderProductId, orderProductId),
      eq(reviews.productId, productId),
      eq(reviews.userId, session.id)
    ),
    columns: {
      id: true,
      rating: true,
      review: true,
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}
