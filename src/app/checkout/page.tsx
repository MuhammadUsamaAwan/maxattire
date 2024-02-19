import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '~/lib/actions/auth';
import { getAddresses } from '~/lib/fetchers/addresses';
import { getCart } from '~/lib/fetchers/cart';
import { formatPrice } from '~/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { CartItems } from '~/components/checkout/cart-items';

import { OrderConfirmForm } from './_components/order-confirm-form';

const getCachedAddresses = unstable_cache(
  async () => {
    return getAddresses();
  },
  [],
  {
    revalidate: 1,
    tags: ['address'],
  }
);

const getCachedCart = unstable_cache(
  async () => {
    return getCart();
  },
  [],
  {
    revalidate: 1,
    tags: ['cart'],
  }
);

export default async function CheckoutPage() {
  const cart = await getCachedCart();
  const addresses = await getCachedAddresses();
  const session = await auth();

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className='container pb-8 pt-6 md:py-8'>
      <div className='mb-8 space-y-1'>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
          Confirm Order
        </h1>
        <p className='max-w-[750px] text-base text-muted-foreground sm:text-lg'>
          Enter your information to place your order
        </p>
      </div>
      <div className='grid gap-8 sm:grid-cols-2'>
        <div>
          <Card>
            <CardHeader className='flex flex-row items-center space-x-4 py-4'>
              <CardTitle className='line-clamp-1 flex-1'>Your Order</CardTitle>
            </CardHeader>
            <Separator className='mb-4' />
            <CardContent className='pb-6 pl-6 pr-0'>
              <CartItems items={cart} className='max-h-[280px]' isEditable={false} />
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
        <OrderConfirmForm session={session} addresses={addresses} />
      </div>
    </div>
  );
}
