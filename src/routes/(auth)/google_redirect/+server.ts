import { env } from 'process';
import type { ServerLoad } from '@sveltejs/kit';

export const GET: ServerLoad = async () => {
  const clientId = env.GOOGLE_CLIENT_ID;
  const redirectUri = env.GOOGLE_REDIRECT_URI;
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile https://www.googleapis.com/auth/calendar.readonly&access_type=offline&prompt=consent`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl,
    },
  });
};
