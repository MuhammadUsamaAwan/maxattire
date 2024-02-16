'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { products, reviews, users } from '~/db/schema';

export async function getProductReviews(slug: string) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: eq(products.slug, slug),
  });
  if (!product) return [];
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
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
