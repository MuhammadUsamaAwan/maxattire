'use server';

import { db } from '~/db';
import type { BrandsFilters, CategoriesFilters } from '~/types';
import { and, countDistinct, eq, gt, inArray, isNull, lt } from 'drizzle-orm';

import { categories, colors, productCategories, products, productStocks, sizes, stores } from '~/db/schema';

export async function getFilteredSizes(filter?: CategoriesFilters) {
  const colorsIdsPromise = filter?.colors
    ? db.query.colors
        .findMany({
          where: and(inArray(colors.slug, filter.colors), isNull(colors.deletedAt)),
          columns: {
            id: true,
          },
        })
        .then(colors => colors.map(color => color.id))
    : undefined;
  const categoryPromise = filter?.category
    ? db.query.categories.findFirst({
        where: and(eq(categories.slug, filter.category), isNull(categories.deletedAt)),
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
        category && eq(productCategories.categoryId, category.id),
        eq(products.status, 'active'),
        isNull(products.deletedAt)
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
    .where(isNull(sizes.deletedAt))
    .groupBy(sizes.id, sizes.slug, sizes.title);
  return filteredSizes;
}

export async function getFilteredBrandSizes(filter?: BrandsFilters) {
  const brandPromise = filter?.brand
    ? db.query.stores.findFirst({
        where: eq(stores.slug, filter.brand),
        columns: {
          id: true,
        },
      })
    : undefined;
  const colorsIdsPromise = filter?.colors
    ? db.query.colors
        .findMany({
          where: and(inArray(colors.slug, filter.colors), isNull(colors.deletedAt)),
          columns: {
            id: true,
          },
        })
        .then(colors => colors.map(color => color.id))
    : undefined;
  const categoryPromise = filter?.category
    ? db.query.categories.findFirst({
        where: and(eq(categories.slug, filter.category), isNull(categories.deletedAt)),
        columns: {
          id: true,
        },
      })
    : undefined;
  const [brand, colorsIds, category] = await Promise.all([brandPromise, colorsIdsPromise, categoryPromise]);
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
        category && eq(productCategories.categoryId, category.id),
        brand && eq(products.storeId, brand.id),
        eq(products.status, 'active'),
        isNull(products.deletedAt)
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
        productsIds && inArray(productStocks.productId, productsIds),
        isNull(sizes.deletedAt)
      )
    )
    .groupBy(sizes.id, sizes.slug, sizes.title);
  return filteredSizes;
}
