'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';
import { type z } from 'zod';

import { carts, products } from '~/db/schema';
import { auth } from '~/lib/auth';
import { addToCartSchema, removeCartItemSchema, updateCartItemSchema } from '~/lib/validations/cart';

export async function addToCartAction(rawInput: z.infer<typeof addToCartSchema>) {
  const { productId, productStockId, quantity } = addToCartSchema.parse(rawInput);
  const sessionPromise = auth();
  const productStockPromise = await db.query.productStocks.findFirst({
    where: and(
      eq(products.id, productId),
      eq(products.id, productStockId),
      isNull(products.deletedAt),
      eq(products.status, 'active'),
      isNull(products.deletedAt)
    ),
    columns: {
      id: true,
      quantity: true,
    },
  });
  const [session, productStock] = await Promise.all([sessionPromise, productStockPromise]);
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  if (!productStock) {
    throw new Error('Product Stock not found');
  }
  if (productStock.quantity < quantity) {
    throw new Error('Product Stock not enough');
  }
  await db.insert(carts).values({
    userId: Number(session.user.id),
    productId,
    productStockId,
    quantity,
  });
}

export async function removeCartItem(rawInput: z.infer<typeof removeCartItemSchema>) {
  const { id } = removeCartItemSchema.parse(rawInput);
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  await db.delete(carts).where(and(eq(carts.id, id), eq(carts.userId, Number(session.user.id))));
}

export async function updateCartItem(rawInput: z.infer<typeof updateCartItemSchema>) {
  const { id, quantity } = updateCartItemSchema.parse(rawInput);
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  await db
    .update(carts)
    .set({ quantity })
    .where(and(eq(carts.id, id), eq(carts.userId, Number(session.user.id))));
}
