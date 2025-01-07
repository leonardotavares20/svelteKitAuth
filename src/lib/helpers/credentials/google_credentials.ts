import { env } from 'process';
import type { CredentialsData } from '@/lib/interfaces/CredentialsGoogle';

export function getGoogleCredentials(url: URL): CredentialsData {
  return {
    code: url.searchParams.get('code') as string,
    client_id: env.GOOGLE_CLIENT_ID as string,
    client_secret: env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: env.GOOGLE_REDIRECT_URI as string,
    grant_type: 'authorization_code',
  };
}
