'use server';

import { db } from '~/db';
import type { BrandsFilters, CategoriesFilters } from '~/types';
import { and, asc, desc, eq, gt, inArray, lt } from 'drizzle-orm';

import { categories, colors, productCategories, products, productStocks, sizes, stores } from '~/db/schema';

export async function getNewProducts() {
  return db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    with: {
      productStocks: {
        columns: {
          id: true,
        },
        with: {
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      reviews: {
        columns: {
          rating: true,
        },
      },
    },
    limit: 8,
    where: eq(products.isNewarrival, 1),
  });
}

export async function getTopProducts() {
  return db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    with: {
      productStocks: {
        columns: {
          id: true,
        },
        with: {
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      reviews: {
        columns: {
          rating: true,
        },
      },
    },
    limit: 8,
    where: eq(products.isTopselling, 1),
  });
}

export async function getFeaturedProducts() {
  return db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    with: {
      productStocks: {
        columns: {
          id: true,
        },
        with: {
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      reviews: {
        columns: {
          rating: true,
        },
      },
    },
    limit: 8,
    where: eq(products.isFeatured, 1),
  });
}

export async function getWholeSaleProducts() {
  return db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    with: {
      productStocks: {
        columns: {
          id: true,
        },
        with: {
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      reviews: {
        columns: {
          rating: true,
        },
      },
    },
    limit: 8,
    where: eq(products.isWholesale, 1),
  });
}

export async function getFilteredProducts(filter?: CategoriesFilters) {
  const sizesIdsPromise = filter?.sizes
    ? db.query.sizes
        .findMany({
          where: inArray(sizes.slug, filter.sizes),
          columns: {
            id: true,
          },
        })
        .then(sizes => sizes.map(size => size.id))
    : undefined;
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
  const [sizesIds, colorsIds, category] = await Promise.all([sizesIdsPromise, colorsIdsPromise, categoryPromise]);
  const productIds = await db
    .select({
      id: products.id,
    })
    .from(products)
    .innerJoin(productCategories, eq(products.id, productCategories.productId))
    .innerJoin(productStocks, eq(products.id, productStocks.productId))
    .where(
      and(
        filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
        filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
        category && eq(productCategories.categoryId, category.id),
        sizesIds && inArray(productStocks.sizeId, sizesIds),
        colorsIds && inArray(productStocks.colorId, colorsIds)
      )
    )
    .groupBy(products.id)
    .then(products => products.map(product => product.id));
  const productsResult = await db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    with: {
      productStocks: {
        columns: {
          id: true,
        },
        with: {
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      reviews: {
        columns: {
          rating: true,
        },
      },
    },
    where: inArray(products.id, productIds),
    orderBy: filter?.sort === 'pricedesc' ? desc(products.sellPrice) : asc(products.sellPrice),
    offset: filter?.page ? 12 * filter.page : undefined,
    limit: 12,
  });
  return { products: productsResult, productsCount: productIds.length };
}

export async function getFilteredBrandProducts(filter?: BrandsFilters) {
  const brandPromise = filter?.brand
    ? db.query.stores.findFirst({
        where: eq(stores.slug, filter.brand),
        columns: {
          id: true,
        },
      })
    : undefined;
  const sizesIdsPromise = filter?.sizes
    ? db.query.sizes
        .findMany({
          where: inArray(sizes.slug, filter.sizes),
          columns: {
            id: true,
          },
        })
        .then(sizes => sizes.map(size => size.id))
    : undefined;
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
  const [brand, sizesIds, colorsIds, category] = await Promise.all([
    brandPromise,
    sizesIdsPromise,
    colorsIdsPromise,
    categoryPromise,
  ]);
  const productIds = await db
    .select({
      id: products.id,
    })
    .from(products)
    .innerJoin(productCategories, eq(products.id, productCategories.productId))
    .innerJoin(productStocks, eq(products.id, productStocks.productId))
    .where(
      and(
        filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
        filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
        category && eq(productCategories.categoryId, category.id),
        sizesIds && inArray(productStocks.sizeId, sizesIds),
        colorsIds && inArray(productStocks.colorId, colorsIds),
        brand && eq(products.storeId, brand.id)
      )
    )
    .groupBy(products.id)
    .then(products => products.map(product => product.id));
  const productsResult = await db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    with: {
      productStocks: {
        columns: {
          id: true,
        },
        with: {
          color: {
            columns: {
              title: true,
              code: true,
            },
          },
        },
      },
      reviews: {
        columns: {
          rating: true,
        },
      },
    },
    where: inArray(products.id, productIds),
    orderBy: filter?.sort === 'pricedesc' ? desc(products.sellPrice) : asc(products.sellPrice),
    offset: filter?.page ? 12 * filter.page : undefined,
    limit: 12,
  });
  return { products: productsResult, productsCount: productIds.length };
}

export type Products = Awaited<ReturnType<typeof getNewProducts>>;
