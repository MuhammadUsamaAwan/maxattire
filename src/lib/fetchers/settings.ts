'use server';

import { db } from '~/db';
import { and, eq, inArray } from 'drizzle-orm';

import { settings } from '~/db/schema';

export async function getLinks() {
  const keys = ['Email', 'Phone', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn'];
  const links = await db.query.settings.findMany({
    where: and(inArray(settings.key, keys), eq(settings.status, 'active')),
    columns: {
      value: true,
      key: true,
    },
  });
  return {
    email: links.find(s => s.key === 'Email')?.value,
    phone: links.find(s => s.key === 'Phone')?.value,
    facebook: links.find(s => s.key === 'Facebook')?.value,
    instagram: links.find(s => s.key === 'Instagram')?.value,
    twitter: links.find(s => s.key === 'Twitter')?.value,
    linkedin: links.find(s => s.key === 'LinkedIn')?.value,
  };
}

export type Links = Awaited<ReturnType<typeof getLinks>>;
