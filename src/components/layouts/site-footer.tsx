import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '~/config/site';
import { type Categories } from '~/lib/fetchers/categories';
import { type Links } from '~/lib/fetchers/settings';
import { Icons } from '~/components/icons';

type SiteFooterProps = {
  categories: Categories;
  links: Links;
};

export function SiteFooter({ categories, links }: SiteFooterProps) {
  const footerLinks = [
    {
      title: 'Products',
      items: categories.map(category => ({
        title: category.title,
        href: `/categories/${category.slug}`,
      })),
    },
    {
      title: 'Customer Service',
      items: [
        {
          title: 'Apparel Decoration',
          href: '/apparel-decoration',
        },
        {
          title: 'Coupons & Promotions',
          href: '/coupons-and-promotions',
        },
        {
          title: 'Contact Us',
          href: '/contact-us',
        },
        {
          title: 'Returns',
          href: '/returns',
        },
        {
          title: 'Shipping & Payment',
          href: '/shipping-and-payment',
        },
      ],
    },
    {
      title: 'My Account',
      items: [
        {
          title: 'Orders Status',
          href: '/orders-status',
        },
        {
          title: 'Wish List',
          href: '/wish-list',
        },
        {
          title: 'Compare Product List',
          href: '/compare-product-list',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          title: 'About Us',
          href: '/about-us',
        },
        {
          title: 'Privacy Policy',
          href: '/privacy-policy',
        },
        {
          title: 'Terms and Conditions',
          href: '/terms-and-conditions',
        },
      ],
    },
  ];

  return (
    <footer className='w-full border-t bg-background'>
      <div className='container py-10'>
        <section
          id='footer-content'
          aria-labelledby='footer-content-heading'
          className='flex flex-col gap-10 lg:flex-row lg:gap-20'
        >
          <section id='footer-branding' aria-labelledby='footer-branding-heading'>
            <Link href='/'>
              <Image src='/images/logo.jpeg' alt={siteConfig.title} width={117} height={20} />
            </Link>
          </section>
          <section
            id='footer-links'
            aria-labelledby='footer-links-heading'
            className='grid flex-1 grid-cols-1 gap-10 xxs:grid-cols-2 sm:grid-cols-5'
          >
            {footerLinks.map(item => (
              <div key={item.title} className='space-y-1.5'>
                <h4 className='text-base font-medium'>{item.title}</h4>
                <ul className='space-y-1'>
                  {item.items.map(link => (
                    <li key={link.title}>
                      <Link href={link.href} className='text-sm hover:text-primary'>
                        {link.title}
                        <span className='sr-only'>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className='space-y-1.5'>
              <h4 className='text-base font-medium'>Let&apos;s Talk</h4>
              <ul className='space-y-1'>
                <li>
                  {links.phone && (
                    <a href={`tel:${links.phone}`} className='text-sm hover:text-primary'>
                      {links.phone}
                    </a>
                  )}
                </li>
                <div>
                  {links.email && (
                    <a href={`mailto:${links.email}`} className='text-sm hover:text-primary'>
                      {links.email}
                    </a>
                  )}
                </div>
              </ul>
            </div>
          </section>
        </section>
        <section
          id='footer-bottom'
          aria-labelledby='footer-bottom-heading'
          className='mt-6 flex flex-col items-center justify-between gap-6 sm:flex-row'
        >
          <div className='flex items-center space-x-4'>
            {links.facebook && (
              <a href={links.facebook} rel='noreferrer' target='_blank' aria-label='facebook'>
                <Icons.facebook className='size-5' />
              </a>
            )}
            {links.instagram && (
              <a href={links.instagram} rel='noreferrer' target='_blank' aria-label='instagram'>
                <Icons.instagram className='size-5' />
              </a>
            )}
            {links.twitter && (
              <a href={links.twitter} rel='noreferrer' target='_blank' aria-label='twitter'>
                <Icons.twitter className='size-5' />
              </a>
            )}
            {links.linkedin && (
              <a href={links.linkedin} rel='noreferrer' target='_blank' aria-label='linkedin'>
                <Icons.linkedin className='size-5' />
              </a>
            )}
          </div>
          <p className='text-center text-sm sm:text-left'>
            &copy; {new Date().getFullYear()} {siteConfig.title}. All Rights Reserved.
          </p>
        </section>
      </div>
    </footer>
  );
}
