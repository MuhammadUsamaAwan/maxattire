'use client';

import * as React from 'react';
import Link from 'next/link';
import { uniqBy } from 'lodash';

import { type Product } from '~/lib/fetchers/products';
import { type ProductStocks } from '~/lib/fetchers/productStock';
import { formatPrice } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Icons } from '~/components/icons';

type AddToCartProps = {
  color: string | undefined;
  product: Product;
  stock: ProductStocks;
};

export function AddToCart({ color, product, stock }: AddToCartProps) {
  const colors = React.useMemo(
    () =>
      uniqBy(
        product.productStocks.map(stock => stock.color),
        'slug'
      ) as { title: string; slug: string; code: string }[],
    [product]
  );
  const [cartData, setCartData] = React.useState<
    {
      stockId: number;
      quantity: number;
    }[]
  >([]);

  React.useEffect(() => {
    setCartData([]);
  }, [stock]);

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
      <Button size='lg'>
        <Icons.cart className='mr-2 size-5' />
        Add to Cart
      </Button>
    </div>
  );
}
