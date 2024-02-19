import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '~/lib/actions/auth';
import { getCart } from '~/lib/fetchers/cart';
import { formatPrice } from '~/lib/utils';
import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { CartItems } from '~/components/checkout/cart-items';

const getCachedData = unstable_cache(
  async () => {
    return getCart();
  },
  [],
  {
    revalidate: 1,
    tags: ['cart'],
  }
);

export default async function CartPage() {
  const session = await auth();
  const cart = await getCachedData();

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className='container grid items-center gap-8 pb-8 pt-6 md:py-8'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>Checkout</h1>
        <p className='max-w-[750px] text-base text-muted-foreground sm:text-lg'>Checkout with your cart items</p>
      </div>
      <Card>
        <CardHeader className='flex flex-row items-center space-x-4 py-4'>
          <CardTitle className='line-clamp-1 flex-1'>Your Cart</CardTitle>
          <Link
            aria-label='Checkout'
            href='/checkout'
            className={buttonVariants({
              size: 'sm',
            })}
          >
            Checkout
          </Link>
        </CardHeader>
        <Separator className='mb-4' />
        <CardContent className='pb-6 pl-6 pr-0'>
          <CartItems items={cart} className='max-h-[280px]' />
        </CardContent>
        <Separator className='mb-4' />
        <CardFooter className='space-x-4'>
          <span className='flex-1'>Total ({cart.reduce((acc, item) => acc + (item.quantity ?? 0), 0)})</span>
          <span>
            {formatPrice(
              cart?.reduce((total, item) => total + (item.quantity ?? 0) * (item.productStock?.price ?? 0), 0) ?? 0
            )}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
