'use server';

import { db } from '~/db';
import type { ActiveFilters } from '~/types';
import { and, countDistinct, eq, gt, inArray, lt } from 'drizzle-orm';

import { categories, colors, productCategories, products, productStocks, sizes } from '~/db/schema';

export async function getSizes() {
  return db.query.sizes.findMany({
    columns: {
      slug: true,
      title: true,
    },
  });
}

export async function getFilteredSizes(filter?: ActiveFilters) {
  const colorsIdsPromise = filter?.colors
    ? db.query.colors
        .findMany({
          where: inArray(colors.slug, filter.colors),
          columns: {
            id: true,
          },
        })
        .then(colors => colors.map(color => color.id))
    : undefined;
  const categoryPromise = filter?.category
    ? db.query.categories.findFirst({
        where: eq(categories.slug, filter.category),
        columns: {
          id: true,
        },
      })
    : undefined;
  const [colorsIds, category] = await Promise.all([colorsIdsPromise, categoryPromise]);
  const productsIds = await db
    .select({
      id: products.id,
    })
    .from(products)
    .innerJoin(productCategories, eq(products.id, productCategories.productId))
    .where(
      and(
        filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
        filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
        category && eq(productCategories.categoryId, category.id)
      )
    )
    .groupBy(products.id)
    .then(products => products.map(product => product.id));
  const filteredSizes = await db
    .select({
      slug: sizes.slug,
      title: sizes.title,
      productCount: countDistinct(productStocks.productId),
    })
    .from(sizes)
    .innerJoin(
      productStocks,
      and(
        eq(sizes.id, productStocks.sizeId),
        colorsIds && inArray(productStocks.colorId, colorsIds),
        productsIds && inArray(productStocks.productId, productsIds)
      )
    )
    .groupBy(sizes.id, sizes.slug, sizes.title);
  return filteredSizes;
}
