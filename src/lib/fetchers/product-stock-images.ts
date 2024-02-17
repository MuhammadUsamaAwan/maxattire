'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { colors, products, productStockImages, productStocks } from '~/db/schema';

export async function getProductStockImages(productSlug: string, colorSlug?: string) {
  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, productSlug), isNull(products.deletedAt), eq(products.status, 'active')),
    columns: {
      id: true,
    },
  });
  if (!product) return [];
  if (!colorSlug)
    return db
      .select({ fileName: productStockImages.fileName })
      .from(productStockImages)
      .where(eq(productStockImages.productId, product.id));
  const color = await db.query.colors.findFirst({
    where: and(eq(colors.slug, colorSlug), isNull(colors.deletedAt)),
    columns: {
      id: true,
    },
  });
  if (!color)
    return db
      .select({ fileName: productStockImages.fileName })
      .from(productStockImages)
      .where(eq(productStockImages.productId, product.id));
  return db
    .select({
      fileName: productStockImages.fileName,
    })
    .from(productStockImages)
    .leftJoin(
      productStocks,
      and(
        eq(productStockImages.productStockId, productStocks.id),
        eq(productStocks.colorId, color.id),
        isNull(productStocks.deletedAt),
        eq(productStockImages.productId, product.id)
      )
    );
}
