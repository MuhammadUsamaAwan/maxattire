import Image from 'next/image';
import Link from 'next/link';

import { getCoupons, type Coupons } from '~/lib/fetchers/coupon';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { CopyButton } from '~/components/copy-button';
import { PlaceholderImage } from '~/components/placeholder-image';

export default async function CouponsPromotionsPage() {
  const coupons = await getCoupons();

  return (
    <div className='container py-10'>
      <div className='mb-8 space-y-1'>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
          Discount Coupons
        </h1>
        <p className='max-w-[750px] text-base text-muted-foreground sm:text-lg'>
          Get the best deals on your favorite products
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {coupons?.map(coupon => <CouponCard key={coupon.id} coupon={coupon} />)}
      </div>
    </div>
  );
}

type CouponCardProps = {
  coupon: Coupons[number];
};

function CouponCard({ coupon }: CouponCardProps) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='border-b p-0'>
        <Link href={`/categories/${coupon.category.slug}`}>
          <AspectRatio ratio={4 / 3}>
            {coupon.file ? (
              <Image src={coupon.file} alt='coupon' className='object-cover' fill loading='lazy' />
            ) : (
              <PlaceholderImage className='rounded-none' asChild />
            )}
          </AspectRatio>
        </Link>
      </CardHeader>
      <CardContent className='space-y-1.5 p-4'>
        <CardTitle className='line-clamp-1 flex items-center justify-between'>
          <Link href={`/categories/${coupon.category.slug}`} className='text-xl'>
            {coupon.code}
          </Link>
          <CopyButton value={coupon.code} size='sm' variant='outline' />
        </CardTitle>
        <p>
          {coupon.discountType === 'percentage' ? `${coupon.discount}% off` : `$${coupon.discount} off`} on{' '}
          {coupon.category.title}&apos;s collection
        </p>
      </CardContent>
    </Card>
  );
}
