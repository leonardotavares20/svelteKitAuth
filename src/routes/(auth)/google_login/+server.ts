import { db } from '@/lib/database.js';
import { fail, redirect, type ServerLoad } from '@sveltejs/kit';

export const POST: ServerLoad = async ({ request, cookies }) => {
  const data = await request.json();

  const email = data.email;

  if (!email) {
    return fail(400, { message: 'Email not found' });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return fail(400, { message: 'User not found' });
  }

  const authenticadedUser = await db.user.update({
    where: { id: user.id },
    data: {
      userAuthToken: crypto.randomUUID(),
      lastLogin: new Date(),
    },
  });

  cookies.set('session', authenticadedUser.userAuthToken as string, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
  });

  throw redirect(303, '/');
};
