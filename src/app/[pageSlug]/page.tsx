import { notFound } from 'next/navigation';

import { getWebsitePage } from '~/lib/fetchers/page';

type WebsitePageProps = {
  params: {
    pageSlug: string;
  };
};

export default async function WebsitePage({ params: { pageSlug } }: WebsitePageProps) {
  const page = await getWebsitePage(pageSlug);

  if (!page) {
    notFound();
  }

  return (
    <div className='container max-w-3xl py-10'>
      <div
        className='prose max-w-full dark:prose-invert'
        dangerouslySetInnerHTML={{
          __html: page?.content ?? 'No content available for this page.',
        }}
      />
    </div>
  );
}
