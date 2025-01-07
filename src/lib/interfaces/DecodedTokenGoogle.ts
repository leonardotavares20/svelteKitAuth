export interface ResponseGoogle {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface DecodedIdTokenGoogle {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
}
