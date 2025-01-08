import { parseResponse } from '../../globals/parse_response';
import type { ResponseGoogle, DecodedIdTokenGoogle } from '$lib/interfaces/DecodedTokenGoogle';
import { jwtDecode } from 'jwt-decode';

export const parseResponseGoogleToken = async (response: Response) => {
  return await parseResponse<ResponseGoogle>(response);
};

export const extractDataGoogleToken = ({
  access_token,
  expires_in,
  id_token,
  refresh_token,
}: ResponseGoogle): { email: string; formData: FormData; access_token: string; expires_in: number } => {
  const decodedToken = jwtDecode(id_token);

  const { email, name, picture } = decodedToken as DecodedIdTokenGoogle;

  const formData = new FormData();

  formData.append('access_token', access_token);
  formData.append('expires_in', expires_in.toString());
  formData.append('id_token', id_token);
  formData.append('refresh_token', refresh_token);
  formData.append('email', email);
  formData.append('name', name);
  formData.append('picture', picture);

  return {
    email: formData.get('email') as string,
    formData,
    access_token,
    expires_in,
  };
};
