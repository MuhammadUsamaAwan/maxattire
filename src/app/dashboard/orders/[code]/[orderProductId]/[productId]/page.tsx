import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ProductReview } from '~/app/products/_components/product-reviews';

import { auth } from '~/lib/actions/auth';
import { getProductSlugTitle } from '~/lib/fetchers/products';
import { getReview } from '~/lib/fetchers/reviews';
import { Separator } from '~/components/ui/separator';

import { AddReviewForm } from './_components/add-review-form';

type ReviewProductPageProps = {
  params: {
    orderProductId: string;
    productId: string;
  };
};

export default async function ReviewProductPage({ params: { orderProductId, productId } }: ReviewProductPageProps) {
  const session = await auth();
  const review = await getReview(Number(orderProductId), Number(productId));
  const product = await getProductSlugTitle(Number(productId));

  if (!session) {
    redirect('/signin');
  }

  if (!product) {
    notFound();
  }

  return (
    <div className='grid items-center gap-8 pb-8 pt-6 md:py-8'>
      <div className='grid gap-1'>
        <h1 className='text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]'>
          Product review
        </h1>
        <p className='max-w-[750px] text-sm text-muted-foreground sm:text-base'>
          Review{' '}
          <Link href={`/products/${product.slug}`} className='underline-offset-4 hover:underline'>
            {product.title}
          </Link>
        </p>
        <Separator className='mt-2.5' />
      </div>
      {review ? (
        <ProductReview review={review} />
      ) : (
        <AddReviewForm productId={Number(productId)} orderProductId={Number(orderProductId)} />
      )}
    </div>
  );
}
