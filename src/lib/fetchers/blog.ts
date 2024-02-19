'use server';

import { db } from '~/db';
import { and, desc, eq, isNull } from 'drizzle-orm';

import { posts } from '~/db/schema';

export async function getBlogPosts() {
  return db.query.posts.findMany({
    where: and(isNull(posts.deletedAt), eq(posts.status, 'active')),
    columns: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      tags: true,
      createdAt: true,
    },
    with: {
      author: {
        columns: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: desc(posts.createdAt),
  });
}

export type BlogPosts = Awaited<ReturnType<typeof getBlogPosts>>;

export async function getBlogPost(slug: string) {
  return db.query.posts.findFirst({
    where: and(isNull(posts.deletedAt), eq(posts.status, 'active'), eq(posts.slug, slug)),
    columns: {
      title: true,
      thumbnail: true,
      tags: true,
      description: true,
      createdAt: true,
    },
    with: {
      author: {
        columns: {
          name: true,
          image: true,
        },
      },
    },
  });
}
