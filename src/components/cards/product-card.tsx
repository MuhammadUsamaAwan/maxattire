'use client';

import Link from 'next/link';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

import { type Products } from '~/lib/fetchers/products';
import { formatPrice } from '~/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

type ProductCard = {
  product: Products[number];
};

export function ProductCard({ product }: ProductCard) {
  return (
    <Card className='size-full overflow-hidden rounded-sm'>
      <CardHeader className='border-b p-0'>
        <Link aria-label={product.title} href={`/product/${product.slug}`}>
          <AspectRatio ratio={4 / 3}>
            <img src={product.thumbnail ?? ''} alt={product.title} className='object-cover' />
          </AspectRatio>
        </Link>
      </CardHeader>
      <CardContent className='space-y-1.5 p-4'>
        <CardTitle className='line-clamp-1'>
          <Link href={`/product/${product.title}`}>{product.title}</Link>
        </CardTitle>
        <CardDescription className='line-clamp-1'>{formatPrice(product.sellPrice ?? 0)}</CardDescription>
      </CardContent>
    </Card>
  );
}
