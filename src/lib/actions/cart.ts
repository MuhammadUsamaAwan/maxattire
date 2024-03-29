'use server';

import { revalidateTag } from 'next/cache';
import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';
import { type z } from 'zod';

import { carts, products, productStocks } from '~/db/schema';
import { auth } from '~/lib/actions/auth';
import { addToCartSchema, removeCartItemSchema, updateCartItemSchema } from '~/lib/validations/cart';

export async function addToCartAction(rawInput: z.infer<typeof addToCartSchema>) {
  const { productId, productStockId, quantity } = addToCartSchema.parse(rawInput);
  const sessionPromise = auth();
  const productStockPromise = await db
    .select({
      id: productStocks.id,
      quantity: productStocks.id,
    })
    .from(productStocks)
    .innerJoin(
      products,
      and(
        eq(products.id, productId),
        eq(productStocks.id, productStockId),
        isNull(products.deletedAt),
        eq(products.status, 'active')
      )
    );
  const [session, [productStock]] = await Promise.all([sessionPromise, productStockPromise]);
  if (!session) {
    throw new Error('Unauthorized');
  }
  if (!productStock) {
    throw new Error('Product Stock not found');
  }
  if (productStock.quantity < quantity) {
    throw new Error('Product Stock not enough');
  }
  const alreadyInCart = await db.query.carts.findFirst({
    where: and(eq(carts.userId, session.id), eq(carts.productStockId, productStockId), eq(carts.productId, productId)),
    columns: {
      id: true,
      quantity: true,
    },
  });
  if (alreadyInCart) {
    await db
      .update(carts)
      .set({ quantity: (alreadyInCart.quantity ?? 0) + quantity })
      .where(eq(carts.id, alreadyInCart.id));
  } else {
    await db.insert(carts).values({
      userId: session.id,
      productId,
      productStockId,
      quantity,
    });
  }
  revalidateTag('cart');
}

export async function removeCartItem(rawInput: z.infer<typeof removeCartItemSchema>) {
  const { id } = removeCartItemSchema.parse(rawInput);
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  await db.delete(carts).where(and(eq(carts.id, id), eq(carts.userId, session.id)));
  revalidateTag('cart');
}

export async function updateCartItem(rawInput: z.infer<typeof updateCartItemSchema>) {
  const { id, quantity } = updateCartItemSchema.parse(rawInput);
  const session = await auth();
  if (!session || !session.id) {
    throw new Error('Unauthorized');
  }
  await db
    .update(carts)
    .set({ quantity })
    .where(and(eq(carts.id, id), eq(carts.userId, Number(session.id))));
  revalidateTag('cart');
}
