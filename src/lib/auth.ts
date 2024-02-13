import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
    Credentials({
      authorize: (credentials: User) => {
        return credentials;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
});
