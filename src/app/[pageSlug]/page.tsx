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
    <div className='container py-10'>
      <div
        className='prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
        dangerouslySetInnerHTML={{
          __html: page?.content ?? 'No content available for this page.',
        }}
      />
    </div>
  );
}
