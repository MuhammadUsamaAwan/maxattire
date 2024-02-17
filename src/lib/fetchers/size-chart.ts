'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { products, productSpecs, productSpecTypes } from '~/db/schema';

export async function getSizeChart(productSlug: string) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(products.slug, productSlug), isNull(products.deletedAt), eq(products.status, 'active')),
  });
  if (!product) return [];
  return db
    .select({
      size: productSpecs.size,
      value: productSpecs.value,
      title: productSpecTypes.title,
    })
    .from(productSpecs)
    .innerJoin(
      productSpecTypes,
      and(eq(productSpecTypes.productId, product.id), eq(productSpecTypes.id, productSpecs.productSpecTypeId))
    );
}
