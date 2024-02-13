'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { uniqBy } from 'lodash';

import { type Products } from '~/lib/fetchers/products';
import { formatPrice } from '~/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { PlaceholderImage } from '~/components/placeholder-image';

type ProductCard = {
  product: Products[number];
};

export function ProductCard({ product }: ProductCard) {
  const colors = React.useMemo(() => {
    const allColors = product.productStocks.map(stock => stock.color);
    return uniqBy(allColors, 'title');
  }, [product]);

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='border-b p-0'>
        <Link aria-label={product.title} href={`/product/${product.slug}`}>
          <AspectRatio ratio={4 / 3}>
            {product.thumbnail ? (
              <Image src={'/images/logo.jpeg'} alt={product.title} className='object-cover' fill loading='lazy' />
            ) : (
              <PlaceholderImage className='rounded-none' asChild />
            )}
          </AspectRatio>
        </Link>
      </CardHeader>
      <CardContent className='space-y-1.5 p-4'>
        <CardTitle className='line-clamp-1'>
          <Link href={`/product/${product.title}`}>{product.title}</Link>
        </CardTitle>
        <div>
          {product.discount && product.discount > 0 ? (
            <div className='line-clamp-1 flex items-center space-x-2'>
              <div className='text-accent'>{formatPrice(product.sellPrice ?? 0)}</div>
              <div className='text-muted-foreground line-through'>
                {formatPrice((product.sellPrice ?? 0) + product.discount)}
              </div>
            </div>
          ) : (
            <div className='line-clamp-1'>{formatPrice(product.sellPrice ?? 0)}</div>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <div>{colors.length} Colors</div>
          <div className='flex items-start gap-2'>
            {colors.slice(0, 7).map(color => (
              <Tooltip key={color?.code}>
                <TooltipTrigger asChild>
                  <div
                    className='size-5 cursor-pointer rounded-full duration-150 hover:scale-110'
                    style={{
                      backgroundColor: `#${color?.code}`,
                    }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{color?.title}</div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
