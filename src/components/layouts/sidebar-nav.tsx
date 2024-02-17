'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { cn } from '~/lib/utils';
import { Icons } from '~/components/icons';

const items: {
  title: string;
  icon: keyof typeof Icons;
  href: string;
}[] = [
  {
    title: 'Account',
    href: '/dashboard/account',
    icon: 'account',
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: 'dollar',
  },
];

export function SidebarNav() {
  const segment = useSelectedLayoutSegment();

  if (!items?.length) return null;

  return (
    <div className='flex w-full flex-col gap-2 p-1'>
      {items.map((item, index) => {
        const Icon = Icons[item.icon];

        return item.href ? (
          <Link aria-label={item.title} key={index} href={item.href}>
            <span
              className={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground',
                item.href.includes(String(segment)) ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
              )}
            >
              <Icon className='mr-2 size-4' aria-hidden='true' />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className='flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline'
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
}
