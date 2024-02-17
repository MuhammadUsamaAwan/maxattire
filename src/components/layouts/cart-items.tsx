import Image from 'next/image';
import Link from 'next/link';

import { type CartItems } from '~/lib/fetchers/cart';
import { cn, formatPrice } from '~/lib/utils';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import { Icons } from '~/components/icons';
import { UpdateCart } from '~/components/layouts/update-cart';

type CartItemsProps = {
  items: CartItems;
  isEditable?: boolean;
  variant?: 'default' | 'minimal';
} & React.HTMLAttributes<HTMLDivElement>;

export function CartItems({ items, isEditable = true, variant = 'default', className, ...props }: CartItemsProps) {
  return (
    <ScrollArea className='h-full'>
      <div className={cn('flex w-full flex-col gap-5 pr-6', className)} {...props}>
        {items.map(item => (
          <div key={item.id} className='space-y-3'>
            <div className={cn('flex items-start justify-between gap-4', isEditable && 'flex-col xs:flex-row')}>
              <div className='flex items-center space-x-4'>
                {variant === 'default' ? (
                  <div className='relative aspect-square size-16 min-w-fit overflow-hidden rounded'>
                    {item?.product?.thumbnail ? (
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title ?? ''}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        fill
                        className='absolute object-cover'
                        loading='lazy'
                      />
                    ) : (
                      <div className='flex h-full items-center justify-center bg-secondary'>
                        <Icons.placeholder className='size-4 text-muted-foreground' aria-hidden='true' />
                      </div>
                    )}
                  </div>
                ) : null}
                <div className='flex flex-col space-y-1 self-start'>
                  <Link
                    href={`/products/${item?.product?.slug}`}
                    className='line-clamp-1 text-sm font-medium underline-offset-4 hover:underline'
                  >
                    {item.product?.title}
                  </Link>
                  {isEditable ? (
                    <span className='line-clamp-1 text-xs text-muted-foreground'>
                      {formatPrice(item.productStock?.price ?? 0)} x {item.quantity} ={' '}
                      {formatPrice((item.productStock?.price ?? 0) * (item.quantity ?? 0))}
                    </span>
                  ) : (
                    <span className='line-clamp-1 text-xs text-muted-foreground'>Qty {item.quantity}</span>
                  )}
                  <span className='line-clamp-1 text-xs text-muted-foreground'>
                    {item.productStock?.color?.title} / {item.productStock?.size?.title}
                  </span>
                </div>
              </div>
              {isEditable ? (
                <UpdateCart cartItem={item} />
              ) : (
                <div className='flex flex-col space-y-1 font-medium'>
                  <span className='ml-auto line-clamp-1 text-sm'>
                    {formatPrice((item.productStock?.price ?? 0) * (item.quantity ?? 0))}
                  </span>
                  <span className='line-clamp-1 text-xs text-muted-foreground'>
                    {formatPrice(item.productStock?.price ?? 0)} each
                  </span>
                </div>
              )}
            </div>
            {variant === 'default' ? <Separator /> : null}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
