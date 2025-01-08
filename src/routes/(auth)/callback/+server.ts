import { db } from '@/lib/database';
import { redirectTo } from '@/lib/helpers/globals/redirect_to';
import { fail, type ServerLoad } from '@sveltejs/kit';
import { getGoogleCredentials } from '@/lib/helpers/credentials/google_credentials';
import { verifyGoogleToken } from '@/lib/helpers/tokens/google/verify_google_token';
import { parseResponseGoogleToken, extractDataGoogleToken } from '@/lib/helpers/tokens/google/process_google_token';

export const GET: ServerLoad = async ({ url, fetch }) => {
  const credentials = getGoogleCredentials(url);

  if (!credentials.code || !credentials.client_id || !credentials.redirect_uri) {
    fail(400, { message: 'Credentials not found' });

    redirectTo(303, '/login');
  }

  try {
    const response = await verifyGoogleToken(credentials);

    const { data } = await parseResponseGoogleToken(response);

    const { formData: extractedData, email, access_token, expires_in } = extractDataGoogleToken(data);

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      await fetch('/google_register', {
        method: 'POST',
        body: extractedData,
        credentials: 'same-origin',
      });
    }

    if (user) {
      await fetch('/google_login', {
        method: 'POST',
        body: JSON.stringify({ email, access_token, expires_in }),
        credentials: 'same-origin',
      });
    }
  } catch (error) {
    fail(400, { message: 'Something went wrong, please try again' });
  } finally {
    redirectTo(303, '/admin');
  }
};
