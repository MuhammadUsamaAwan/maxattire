import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { env } from '~/env';
import { users } from '~/db/schema';
import { setAccessToken } from '~/lib/actions/auth';
import { absoluteUrl } from '~/lib/utils';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = decodeURIComponent(url.searchParams.get('code') ?? '');
  const tokenResponseRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: absoluteUrl('/api/auth/callback/google'),
      grant_type: 'authorization_code',
    }),
  });
  const tokenResponse = (await tokenResponseRes.json()) as { access_token: string };
  const userInfoResponseRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenResponse.access_token}`,
    },
  });
  const userInfoResponse = (await userInfoResponseRes.json()) as { email: string };

  const user = await db.query.users.findFirst({
    where: and(eq(users.email, userInfoResponse.email), isNull(users.deletedAt)),
    columns: {
      id: true,
      email: true,
      password: true,
      status: true,
      image: true,
      name: true,
    },
  });
  if (user) {
    if (user.status === 'not-active') {
      throw new Error('User is not active');
    }
    if (user.status === 'blocked') {
      throw new Error('User is blocked');
    }
    await setAccessToken({ id: user.id, email: user.email, name: user.name, image: user.image });
    return redirect('/');
  } else {
    await db.insert(users).values({
      email: userInfoResponse.email,
      password: '',
      status: 'active',
    });
    const user = await db.query.users.findFirst({
      where: eq(users.email, userInfoResponse.email),
      columns: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await setAccessToken({ id: user.id, email: user.email, name: user.name, image: user.image });
    revalidateTag('cart');
    return redirect('/');
  }
}
