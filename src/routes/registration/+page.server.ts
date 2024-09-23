import bycrypt from 'bcrypt';
import { ZodError } from 'zod';
import { db } from '@/lib/database';
import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { registerSchema } from '@/lib/validation_schemas/register';

enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const actions: Actions = {
  register: async ({ request }) => {
    const data = await request.formData();

    const form = Object.fromEntries(data) as Record<string, string>;

    try {
      const formValidation = registerSchema.parse(form);

      const { username, password } = formValidation;

      const user = await db.user.findUnique({
        where: { username },
      });

      if (user) {
        return fail(400, {
          username: { user: true, message: 'Username already exists' },
        });
      }

      const role = await db.roles.findUnique({ where: { name: Roles.USER } });

      if (!role) {
        throw new Error('Role not found');
      }

      await db.user.create({
        data: {
          username,
          passwordHash: await bycrypt.hash(password, 10),
          userAuthToken: crypto.randomUUID(),
          role: { connect: { id: role.id } },
        },
      });

      throw redirect(303, '/login');
    } catch (error) {
      if (error instanceof ZodError) {
        const { fieldErrors } = error.flatten();

        const { username } = form;

        return {
          register: {
            fieldErrors,
            formData: { username },
          },
        };
      }

      throw error;
    }
  },
};
