import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = (async () => {
  throw redirect(302, '/');
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    });

    throw redirect(302, '/login');
  },
};
