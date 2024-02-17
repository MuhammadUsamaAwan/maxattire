'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { addToCartAction } from '~/lib/actions/cart';
import { type ProductColors } from '~/lib/fetchers/colors';
import { type ProductStocks } from '~/lib/fetchers/product-stock';
import { catchError, formatPrice } from '~/lib/utils';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Icons } from '~/components/icons';
import { LoadingButton } from '~/components/loading-button';

type AddToCartProps = {
  productId: number;
  colors: ProductColors;
  stock: ProductStocks;
  color: string | undefined;
  isAuthed: boolean;
};

export function AddToCart({ productId, stock, colors, color, isAuthed }: AddToCartProps) {
  const router = useRouter();

  const [cartData, setCartData] = React.useState<
    {
      stockId: number;
      quantity: number;
    }[]
  >([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    setCartData([]);
  }, [stock]);

  function addToCart() {
    if (!isAuthed) {
      router.push('/signin');
    } else {
      startTransition(async () => {
        try {
          await Promise.all(
            cartData.map(async item => {
              await addToCartAction({
                productId,
                productStockId: item.stockId,
                quantity: item.quantity,
              });
            })
          );
        } catch (error) {
          catchError(error);
        }
      });
    }
  }

  return (
    <div className='space-y-4'>
      {colors && (
        <div className='space-y-1.5'>
          <div className='text-base font-semibold'>Color:</div>
          <div className='flex flex-wrap gap-2'>
            {colors.map(c => (
              <Tooltip key={c.slug}>
                <TooltipTrigger asChild>
                  <Link
                    href={`?${new URLSearchParams({
                      color: c.slug,
                    }).toString()}`}
                  >
                    <Checkbox
                      checked={c.slug === color}
                      className='size-8 rounded-full border-0'
                      style={{
                        backgroundColor: `#${c.code}` ?? '',
                      }}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{c.title}</div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
      {stock.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Size</TableHead>
              <TableHead className='text-center'>Price</TableHead>
              <TableHead className='text-center'>Stock</TableHead>
              <TableHead className='text-center'>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stock.map((s, index) => (
              <TableRow key={index}>
                <TableCell className='text-center'>{s.size.title}</TableCell>
                <TableCell className='text-center'>{formatPrice(s.price)}</TableCell>
                <TableCell className='text-center'>{s.quantity}</TableCell>
                <TableCell className='text-center'>
                  <div className='flex justify-center'>
                    <Input
                      type='number'
                      min='0'
                      max={s.quantity}
                      className='h-8 w-16'
                      value={cartData.find(c => c.stockId === s.id)?.quantity ?? ''}
                      onChange={e => {
                        const value = Number(e.target.value);
                        setCartData(prev =>
                          prev
                            .filter(c => c.stockId !== s.id)
                            .concat({
                              stockId: s.id,
                              quantity: value,
                            })
                        );
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <LoadingButton
        size='lg'
        disabled={!cartData.length || cartData.some(c => c.quantity === 0)}
        onClick={addToCart}
        isLoading={isPending}
      >
        <Icons.cart className='mr-2 size-5' />
        Add to Cart
      </LoadingButton>
    </div>
  );
}
