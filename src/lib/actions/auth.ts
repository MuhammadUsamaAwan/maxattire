/* eslint-disable @typescript-eslint/require-await */
'use server';

import { db } from '~/db';
import { compare, hash } from 'bcryptjs';
import { and, eq, isNull } from 'drizzle-orm';
import { type z } from 'zod';

import { users } from '~/db/schema';
import { signOut as authSignOut, signIn } from '~/lib/auth';
import { signInSchema, signUpSchema } from '~/lib/validations/auth';

export async function signInWithGoogle() {
  await signIn('google');
}

export async function signInWithCredentials(rawInput: z.infer<typeof signInSchema>) {
  const { email, password } = signInSchema.parse(rawInput);
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), isNull(users.deletedAt)),
    columns: {
      id: true,
      email: true,
      password: true,
      status: true,
      image: true,
      name: true,
    },
  });
  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }
  const valid = await compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid email or password');
  }
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
    name: user.name,
  });
}

export async function signUpWithCredentials(rawInput: z.infer<typeof signUpSchema>) {
  const { email, password } = signUpSchema.parse(rawInput);
  const hashed = await hash(password, 10);
  try {
    const [user] = await db.insert(users).values({
      email,
      password: hashed,
      status: 'active',
    });
    await signIn('credentials', {
      id: String(user.insertId),
      email: email,
      image: null,
    });
  } catch (error) {
    if (
      typeof error === 'object' &&
      error &&
      'code' in error &&
      typeof error.code === 'string' &&
      error.code === 'ER_DUP_ENTRY'
    ) {
      throw new Error('Email is already in use');
    }
    throw error;
  }
}

export async function signOut() {
  await authSignOut();
}
