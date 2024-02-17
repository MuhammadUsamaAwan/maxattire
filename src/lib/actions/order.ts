'use server';

import { revalidateTag } from 'next/cache';
import { db } from '~/db';
import { eq } from 'drizzle-orm';
import { type z } from 'zod';

import { siteConfig } from '~/config/site';
import { carts, orderProducts, orders, orderStatuses } from '~/db/schema';
import { auth } from '~/lib/actions/auth';
import { orderCreateSchema } from '~/lib/validations/order';

export async function createOrder(rawInput: z.infer<typeof orderCreateSchema>) {
  const { addressId } = orderCreateSchema.parse(rawInput);
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  const cart = await db.query.carts.findMany({
    where: eq(carts.userId, session.id),
    columns: {
      quantity: true,
      tax: true,
      discount: true,
    },
    with: {
      product: {
        columns: {
          id: true,
        },
      },
      productStock: {
        columns: {
          id: true,
          price: true,
        },
        with: {
          size: {
            columns: {
              id: true,
            },
          },
          color: {
            columns: {
              id: true,
            },
          },
        },
      },
    },
  });
  if (cart.length === 0) {
    throw new Error('Cart is empty');
  }
  const grandTotal = cart.reduce((acc, curr) => acc + (curr.productStock?.price ?? 0) * (curr?.quantity ?? 0), 0);
  const getCode = () => {
    return `${siteConfig.title.slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}-${Date.now()}`;
  };
  const [order] = await db.insert(orders).values({
    userId: session.id,
    addressId,
    code: getCode(),
    grandTotal,
    tax: 0,
    paymentStatus: 'not-paid',
  });
  const orderId = order.insertId;
  const orderProductPromises = cart.map(cart => {
    return db.insert(orderProducts).values({
      orderId: orderId,
      productId: cart.product?.id,
      productStockId: cart.productStock?.id as number,
      sizeId: cart.productStock?.id,
      colorId: cart.productStock?.id,
      quantity: cart.quantity,
      price: cart.productStock?.price,
      tax: cart.tax,
      discount: cart.discount,
    });
  });
  const orderStatusPromise = db.insert(orderStatuses).values({
    orderId: orderId,
    status: 'AWAITING_PAYMENT',
  });
  const deleteCartPromise = db.delete(carts).where(eq(carts.userId, session.id));
  await Promise.all([...orderProductPromises, orderStatusPromise, deleteCartPromise]);
  revalidateTag('cart');
  revalidateTag('order');
  return orderId;
}
