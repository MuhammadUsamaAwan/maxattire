'use server';

import { db } from '~/db';
import { eq } from 'drizzle-orm';

import { products } from '~/db/schema';

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

export type Products = Awaited<ReturnType<typeof getNewProducts>>;
