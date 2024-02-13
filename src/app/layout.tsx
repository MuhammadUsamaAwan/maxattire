import type { Metadata, Viewport } from 'next';
import { unstable_cache } from 'next/cache';

import { siteConfig } from '~/config/site';
import { auth } from '~/lib/auth';
import { getCategories } from '~/lib/fetchers/categories';
import { fontSans } from '~/lib/fonts';
import { absoluteUrl, cn } from '~/lib/utils';
import { Toaster } from '~/components/ui/toaster';
import { TooltipProvider } from '~/components/ui/tooltip';
import { SiteHeader } from '~/components/layouts/site-header';
import { TailwindIndicator } from '~/components/layouts/tailwind-indicator';
import { ThemeProvider } from '~/components/layouts/theme-provider';

import '~/styles/globals.css';

import { getStores } from '~/lib/fetchers/stores';

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
    const storesPromise = getStores();
    return Promise.all([categoriesPromise, storesPromise]);
  },
  [],
  {
    revalidate: 60 * 15, // 15 minute
  }
);

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const dataPromise = getCachedData();
  const sessionPromise = auth();
  const [[categories, stores], session] = await Promise.all([dataPromise, sessionPromise]);

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('flex min-h-dvh flex-col font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={500}>
            <SiteHeader categories={categories} session={session} stores={stores} />
            <main className='flex-1'>{children}</main>
            <TailwindIndicator />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
