import { notFound, redirect } from 'next/navigation';

import { auth } from '~/lib/actions/auth';
import { getUnPaidOrder } from '~/lib/fetchers/orders';
import { formatPrice } from '~/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { OrderItems } from '~/components/order-items';

import { PaymentForm } from '../_components/payment-form';

type PaymentPageProps = {
  params: {
    orderId: string;
  };
};

export default async function PaymentPage({ params: { orderId } }: PaymentPageProps) {
  const session = await auth();
  const order = await getUnPaidOrder(Number(orderId));

  if (!session) {
    redirect('/signin');
  }

  if (!order) {
    notFound();
  }

  return (
    <div className='container pb-8 pt-6 md:py-8'>
      <div className='mb-8 space-y-1'>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>Payment</h1>
        <p className='max-w-[750px] text-base text-muted-foreground sm:text-lg'>
          Enter your credit card details for payment
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
              <OrderItems order={order} />
            </CardContent>
            <Separator className='mb-4' />
            <CardFooter className='space-x-4'>
              <span className='flex-1'>
                Total ({order.orderProducts.reduce((acc, curr) => acc + (curr.quantity ?? 0), 0)})
              </span>
              <span>
                {formatPrice(
                  order.orderProducts.reduce((total, item) => total + (item.quantity ?? 0) * (item.price ?? 0), 0) ?? 0
                )}
              </span>
            </CardFooter>
          </Card>
        </div>
        <PaymentForm orderId={Number(orderId)} />
      </div>
    </div>
  );
}
