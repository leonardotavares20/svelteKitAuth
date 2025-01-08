import { redirect } from '@sveltejs/kit';

export const redirectTo = (code: number, path: string) => {
  throw redirect(code, path);
};
