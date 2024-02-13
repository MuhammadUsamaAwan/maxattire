/* eslint-disable @typescript-eslint/require-await */
'use server';

import { db } from '~/db';
import { compare } from 'bcrypt';
import { and, eq, isNull } from 'drizzle-orm';
import { type z } from 'zod';

import { users } from '~/db/schema';
import { signOut as authSignOut, signIn } from '~/lib/auth';
import { authSchema } from '~/lib/validations/auth';

export async function signInWithGoogle() {
  await signIn('google');
}

export async function signInWithCredentials(rawInput: z.infer<typeof authSchema>) {
  const { email, password } = authSchema.parse(rawInput);
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), isNull(users.deletedAt)),
  });
  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }
  const valid = await compare(password, user.password);
  //   if (!valid) {
  //     throw new Error('Invalid email or password');
  //   }
  //   if (!user.emailVerifiedAt) {
  //     throw new Error('Email is not verified');
  //   }
  if (user.status === 'not-active') {
    throw new Error('User is not active');
  }
  if (user.status === 'blocked') {
    throw new Error('User is blocked');
  }
  await signIn('credentials', {
    id: String(user.id),
    email: user.email,
    image: user.image,
  });
}

export async function signOut() {
  await authSignOut();
}
