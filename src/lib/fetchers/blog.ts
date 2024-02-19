'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { posts } from '~/db/schema';

export function getBlogPosts() {
  return db.query.posts.findMany({
    where: and(isNull(posts.deletedAt), eq(posts.status, 'active')),
    columns: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      tags: true,
      description: true,
    },
  });
}
