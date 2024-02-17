'use server';

import { db } from '~/db';
import { eq } from 'drizzle-orm';

import { users } from '~/db/schema';
import { auth, setAccessToken } from '~/lib/actions/auth';

export async function updateUser(name: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }
  await db.update(users).set({ name }).where(eq(users.id, session.id));
  await setAccessToken({ ...session, name });
}
