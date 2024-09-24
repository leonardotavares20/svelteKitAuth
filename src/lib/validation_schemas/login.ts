import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Username must be more than 3 characters' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(3, { message: 'Password must be more than 3 characters' }),
});
