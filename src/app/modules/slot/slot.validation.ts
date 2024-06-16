import { z } from 'zod';

export const dateStringSchema = z.string().refine(
  (dateString) => {
    // Regular expression to match YYYY-MM-DD format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  },
  {
    message: 'Invalid date format. Date must be in YYYY-MM-DD format.',
  },
);

export const timeStringSchema = z.string().refine(
  (timeString) => {
    // Regular expression to match HH:MM format (24-hour clock)
    const regex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
    return regex.test(timeString);
  },
  {
    message:
      'Invalid time format. Time must be in HH:MM format (00:00 to 23:59).',
  },
);

export const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string(),
      date: dateStringSchema,
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before end time',
      },
    ),
});
