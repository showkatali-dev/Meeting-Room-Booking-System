import { z } from 'zod';
import { dateStringSchema } from '../slot/slot.validation';

export const createBookingValidationSchema = z.object({
  body: z.object({
    room: z.string(),
    slots: z.array(z.string()),
    user: z.string(),
    date: dateStringSchema,
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z
    .object({
      isConfirmed: z.enum(['unconfirmed', 'confirmed', 'canceled']),
    })
    .strict(),
});
