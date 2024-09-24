import bycrypt from 'bcrypt';
import { ZodError } from 'zod';
import { db } from '@/lib/database';
import type { Actions } from '@sveltejs/kit';
import { redirect, fail } from '@sveltejs/kit';
import { loginSchema } from '@/lib/validation_schemas/login';

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();

    const form = Object.fromEntries(data) as Record<string, string>;

    try {
      const formValidation = loginSchema.parse(form);

      const { username, password } = formValidation;

      const user = await db.user.findUnique({ where: { username } });

      if (!user) {
        return fail(400, {
          credentials: { credentials: true, message: "User doesn't exist" },
        });
      }

      const userPassword = await bycrypt.compare(password, user.passwordHash);

      if (!userPassword) {
        return fail(400, {
          credentials: { credentials: true, message: 'Wrong password' },
        });
      }

      const authenticadedUser = await db.user.update({
        where: { id: user.id },
        data: { userAuthToken: crypto.randomUUID() },
      });

      cookies.set('session', authenticadedUser.userAuthToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      });

      throw redirect(303, '/');
    } catch (error) {
      if (error instanceof ZodError) {
        const { fieldErrors } = error.flatten();
        console.log(fieldErrors);

        return {
          login: {
            fieldErrors,
          },
        };
      }

      throw error;
    }
  },
};
