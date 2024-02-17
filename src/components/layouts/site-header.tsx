import Link from 'next/link';
import type { JWTPayload } from '~/types';

import { signOut } from '~/lib/actions/auth';
import { type Brands } from '~/lib/fetchers/brands';
import { type Categories } from '~/lib/fetchers/categories';
import { getInitials } from '~/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button, buttonVariants } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Icons } from '~/components/icons';
import { CartSheet } from '~/components/layouts/cart-sheet';
import { MainNav } from '~/components/layouts/main-nav';
import { MobileNav } from '~/components/layouts/mobile-nav';
import { ProductSearch } from '~/components/layouts/products-search';

type SiteHeaderProps = {
  categories: Categories;
  session: JWTPayload | null;
  brands: Brands;
};

export function SiteHeader({ categories, session, brands }: SiteHeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <MainNav categories={categories} brands={brands} />
        <MobileNav categories={categories} brands={brands} />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <ProductSearch />
            <CartSheet />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='secondary' className='relative size-8 rounded-full'>
                    <Avatar className='size-8'>
                      <AvatarImage src={session.image ?? ''} alt={session.name ?? ''} />
                      <AvatarFallback>{getInitials(session.name ?? session.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56' align='end' forceMount>
                  <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium leading-none'>{session.name}</p>
                      <p className='text-xs leading-none text-muted-foreground'>{session.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href='/dashboard/orders'>
                        <Icons.dashboard className='mr-2 size-4' aria-hidden='true' />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/dashboard/account'>
                        <Icons.settings className='mr-2 size-4' aria-hidden='true' />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={signOut} className='w-full'>
                      <button className='inline-flex w-full items-center'>
                        <Icons.logout className='mr-2 size-4' aria-hidden='true' />
                        Log out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href='/signin'
                className={buttonVariants({
                  size: 'sm',
                })}
              >
                Sign In
                <span className='sr-only'>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
