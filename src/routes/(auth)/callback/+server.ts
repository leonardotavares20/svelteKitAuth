import { db } from '@/lib/database';
import { redirect, fail, type ServerLoad } from '@sveltejs/kit';
import { getGoogleCredentials } from '@/lib/helpers/credentials/google_credentials';
import { verifyGoogleToken } from '@/lib/helpers/tokens/google/verify_google_token';
import { parseResponseGoogleToken, extractDataGoogleToken } from '@/lib/helpers/tokens/google/process_google_token';

export const GET: ServerLoad = async ({ url, fetch }) => {
  const credentials = getGoogleCredentials(url);

  if (!credentials.code) {
    fail(400, { message: 'Code not found' });

    throw redirect(303, '/login');
  }

  try {
    const response = await verifyGoogleToken(credentials);

    if (!response.ok) {
      fail(400, { message: 'Failed to get token' });

      throw redirect(303, '/login');
    }

    const { data } = await parseResponseGoogleToken(response);

    const { formData: extractedData, email } = extractDataGoogleToken(data);

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      await fetch('/google_register', {
        method: 'POST',
        body: extractedData,
        credentials: 'same-origin',
      });

      throw redirect(303, '/');
    }

    if (user) {
      await fetch('/google_login', {
        method: 'POST',
        body: JSON.stringify({ email }),
        credentials: 'same-origin',
      });

      throw redirect(303, '/');
    }
  } catch (error) {
    fail(400, { message: 'Something went wrong' });

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }
};
