import { db } from '~/db';
import { eq } from 'drizzle-orm';
import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { env } from '~/env';
import { users } from '~/db/schema';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      authorize: (credentials: User) => {
        return credentials;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const email = profile?.email;
        if (!email) {
          throw new Error('No email found in profile');
        }
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (user) {
          return true;
        }
        await db.insert(users).values({
          email,
          status: 'active',
          password: '',
        });
        return true;
      }
      return true;
    },
  },
});
