import type { CredentialsData } from '@/lib/interfaces/CredentialsGoogle';

export async function verifyGoogleToken({ code, client_id, client_secret, redirect_uri }: CredentialsData) {
  return await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: code,
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
    }),
  });
}
