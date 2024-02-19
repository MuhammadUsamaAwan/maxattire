'use server';

import { db } from '~/db';
import { eq } from 'drizzle-orm';

import { pages } from '~/db/schema';

export async function getWebsitePage(slug: string) {
  return db.query.pages.findFirst({
    where: eq(pages.slug, slug),
    columns: {
      content: true,
    },
  });
}
