import { db } from '@/lib/database';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGoogleCredentials } from '@/lib/helpers/credentials/google_credentials';
import { redirectTo } from '@/lib/helpers/globals/redirect_to';

export const load: PageServerLoad = async ({ locals, cookies, url }) => {
  if (!locals.user) throw redirect(302, '/');

  const credentials = getGoogleCredentials(url);

  if (locals.user.loginProvider === 'google') {
    let acess_token = cookies.get('access_token');

    if (!acess_token) {
      try {
        const user = await db.user.findUnique({ where: { username: locals.user.name } });

        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: credentials.client_id,
            client_secret: credentials.client_secret,
            refresh_token: user?.userRefreshToken as string,
            grant_type: 'refresh_token',
          }),
        });

        const data = await response.json();

        const userUpdated = await db.user.update({
          where: { username: locals.user.name },
          data: {
            userAcessToken: data.access_token,
          },
        });

        cookies.set('access_token', userUpdated.userAcessToken as string, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: Number(data.expires_in),
          path: '/',
        });

        acess_token = userUpdated.userAcessToken as string;
      } catch (error) {
        fail(400, { message: 'Error to refresh token' });

        redirectTo(303, '/');
      }
    }

    if (!acess_token) {
      fail(400, { message: 'Access token not found' });

      redirectTo(303, '/');
    }

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${acess_token}`,
        },
      });

      const data = await response.json();

      locals.calendar = data;

      return locals;
    } catch (error) {
      fail(400, { message: 'Error to get calendar' });

      redirectTo(303, '/');
    }
  }
};
