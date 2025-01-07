import { db } from '@/lib/database';
import { redirect, fail, type ServerLoad } from '@sveltejs/kit';

enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const POST: ServerLoad = async ({ request, cookies }) => {
  const data = await request.formData();

  const name = data.get('name');
  const email = data.get('email');
  const picture = data.get('picture');
  const accessToken = data.get('access_token');
  const refreshToken = data.get('refresh_token');

  try {
    const role = await db.roles.findUnique({ where: { name: Roles.USER } });

    if (!role) {
      return fail(400, { message: 'Role not found' });
    }

    const user = await db.user.create({
      data: {
        username: name as string,
        email: email as string,
        profilePicture: picture as string,
        userAcessToken: accessToken as string,
        userAuthToken: crypto.randomUUID(),
        lastLogin: new Date(),
        loginProvider: 'google',
        userRefreshToken: refreshToken as string,
        role: { connect: { id: role.id } },
      },
    });

    cookies.set('session', user.userAuthToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    });

    redirect(303, '/');
  } catch (error) {
    console.error(error);
    return fail(400, { message: 'Error creating user' });
  }
};
