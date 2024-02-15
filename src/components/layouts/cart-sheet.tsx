import Link from 'next/link';

import { cn } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { Button, buttonVariants } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { Icons } from '~/components/icons';

const itemCount = 0;

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label='Open cart' variant='outline' size='icon' className='relative'>
          {itemCount > 0 && (
            <Badge variant='secondary' className='absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5'>
              {itemCount}
            </Badge>
          )}
          <Icons.cart className='size-4' aria-hidden='true' />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
          <Separator />
        </SheetHeader>
        <div className='flex h-full flex-col items-center justify-center space-y-1'>
          <Icons.cart className='mb-4 size-16 text-muted-foreground' aria-hidden='true' />
          <div className='text-xl font-medium text-muted-foreground'>Your cart is empty</div>
          <SheetTrigger asChild>
            <Link
              aria-label='Add items to your cart to checkout'
              href='/products'
              className={cn(
                buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground',
                })
              )}
            >
              Add items to your cart to checkout
            </Link>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
