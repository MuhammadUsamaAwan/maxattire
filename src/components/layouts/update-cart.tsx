'use client';

import * as React from 'react';

import { removeCartItem, updateCartItem } from '~/lib/actions/cart';
import { type CartItems } from '~/lib/fetchers/cart';
import { catchError } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Icons } from '~/components/icons';

type UpdateCartProps = {
  cartItem: CartItems[number];
};

export function UpdateCart({ cartItem }: UpdateCartProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className='flex w-full items-center justify-between space-x-2 xs:w-auto xs:justify-normal'>
      <div className='flex items-center'>
        <Button
          variant='outline'
          size='icon'
          className='size-8 rounded-r-none'
          onClick={() => {
            startTransition(async () => {
              try {
                await updateCartItem({
                  id: cartItem.id,
                  quantity: Number(cartItem.quantity) - 1,
                });
              } catch (err) {
                catchError(err);
              }
            });
          }}
          disabled={isPending}
        >
          <Icons.minus className='size-3' aria-hidden='true' />
          <span className='sr-only'>Remove one item</span>
        </Button>
        <Input
          type='number'
          min='1'
          className='h-8 w-14 rounded-none border-x-0'
          value={cartItem.quantity ?? 0}
          onChange={e => {
            startTransition(async () => {
              try {
                await updateCartItem({
                  id: cartItem.id,
                  quantity: Number(e.target.value),
                });
              } catch (err) {
                catchError(err);
              }
            });
          }}
          disabled={isPending}
        />
        <Button
          variant='outline'
          size='icon'
          className='size-8 rounded-l-none'
          onClick={() => {
            startTransition(async () => {
              try {
                await updateCartItem({
                  id: cartItem.id,
                  quantity: Number(cartItem.quantity) + 1,
                });
              } catch (err) {
                catchError(err);
              }
            });
          }}
          disabled={isPending}
        >
          <Icons.plus className='size-3' aria-hidden='true' />
          <span className='sr-only'>Add one item</span>
        </Button>
      </div>
      <Button
        variant='outline'
        size='icon'
        className='size-8'
        onClick={() => {
          startTransition(async () => {
            try {
              await removeCartItem({
                id: cartItem.id,
              });
            } catch (err) {
              catchError(err);
            }
          });
        }}
        disabled={isPending}
      >
        <Icons.trash className='size-3' aria-hidden='true' />
        <span className='sr-only'>Delete item</span>
      </Button>
    </div>
  );
}
