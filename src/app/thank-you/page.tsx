import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Icons } from '~/components/icons';

export default function ThankYouPage() {
  return (
    <div className='container py-10 text-center'>
      <Card className='mx-auto max-w-xl'>
        <CardHeader>
          <Icons.checkCircle className='mx-auto mb-1 size-12 text-green-600' />
          <CardTitle className='text-3xl font-semibold'>Thank You</CardTitle>
          <CardDescription>The order was complete successfully</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center space-x-4'>
            <Icons.mailSend className='size-12 shrink-0' />
            <p>
              An email receipt including the details about your order has beeen sent to your email address. Please keep
              it for your records.
            </p>
          </div>
          <p className='mt-2'>
            You can visit{' '}
            <Link href='/dashboard/orders' className='text-primary underline-offset-4 hover:underline'>
              your dashboard
            </Link>{' '}
            at any time to check the status of your order.
          </p>
        </CardContent>
        <CardFooter className='justify-center'>
          <Link href='/' className={buttonVariants()}>
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
