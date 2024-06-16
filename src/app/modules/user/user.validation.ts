import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .min(8, { message: 'Password should not be less than 8 character' })
      .max(20, { message: 'Password can not be more than 20 character' }),
    phone: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user']),
  }),
});
