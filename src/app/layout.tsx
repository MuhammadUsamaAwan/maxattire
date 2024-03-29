import type { Metadata, Viewport } from 'next';
import { unstable_cache } from 'next/cache';

import { siteConfig } from '~/config/site';
import { getBrands } from '~/lib/fetchers/brands';
import { getCategories } from '~/lib/fetchers/categories';
import { getLinks } from '~/lib/fetchers/settings';
import { fontSans } from '~/lib/fonts';
import { absoluteUrl, cn } from '~/lib/utils';
import { Toaster } from '~/components/ui/toaster';
import { TooltipProvider } from '~/components/ui/tooltip';
import { SiteFooter } from '~/components/layouts/site-footer';
import { SiteHeader } from '~/components/layouts/site-header';
import { TailwindIndicator } from '~/components/layouts/tailwind-indicator';
import { ThemeProvider } from '~/components/layouts/theme-provider';

import '~/styles/globals.css';

import { auth } from '~/lib/actions/auth';

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const getCachedData = unstable_cache(
  async () => {
    const categoriesPromise = getCategories();
    const brandsPromise = getBrands();
    const linksPromise = getLinks();
    return Promise.all([categoriesPromise, brandsPromise, linksPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const dataPromise = getCachedData();
  const sessionPromise = auth();
  const [[categories, brands, links], session] = await Promise.all([dataPromise, sessionPromise]);

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('flex min-h-dvh flex-col font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={500}>
            <SiteHeader categories={categories} session={session} brands={brands} />
            <main className='flex-1'>{children}</main>
            <SiteFooter categories={categories} links={links} />
            <TailwindIndicator />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
