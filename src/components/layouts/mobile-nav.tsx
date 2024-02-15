'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ViewVerticalIcon } from '@radix-ui/react-icons';

import { siteConfig } from '~/config/site';
import { type Brands } from '~/lib/fetchers/brands';
import { type Categories } from '~/lib/fetchers/categories';
import { cn } from '~/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

type MobileNavProps = {
  categories: Categories;
  brands: Brands;
};

export function MobileNav({ categories, brands }: MobileNavProps) {
  const segment = useSelectedLayoutSegment();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden'
        >
          <ViewVerticalIcon className='size-6' aria-hidden='true' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pl-1 pr-0'>
        <div className='px-7'>
          <Link href='/' className='flex items-center' onClick={() => setIsOpen(false)}>
            <Image src='/images/logo.jpeg' alt={siteConfig.title} width={117} height={20} />
            <span className='sr-only'>Home</span>
          </Link>
        </div>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          <div className='pl-1 pr-7'>
            <Accordion type='multiple' className='w-full'>
              {categories.map(category => (
                <AccordionItem value={category.title} key={category.slug}>
                  <AccordionTrigger className='text-sm capitalize'>
                    <Link href={`/${category.slug}`}>{category.title}</Link>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col space-y-2'>
                      {category.children.map(subCategory => (
                        <MobileLink
                          key={subCategory.slug}
                          href={`/${subCategory.slug}`}
                          segment={String(segment)}
                          setIsOpen={setIsOpen}
                        >
                          {subCategory.title}
                        </MobileLink>
                      ))}
                      <div className='space-y-2'>
                        {brands.map(brand => (
                          <Link key={brand.slug} href={`/brands/${brand.slug}`} className='block w-max border p-5'>
                            <Image src={brand.logo ?? ''} alt={brand.slug} width={86} height={38} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

type MobileLinkProps = React.PropsWithChildren & {
  href: string;
  disabled?: boolean;
  segment: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileLink({ children, href, disabled, segment, setIsOpen }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground/70 transition-colors hover:text-foreground',
        href.includes(segment) && 'text-foreground',
        disabled && 'pointer-events-none opacity-60'
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
