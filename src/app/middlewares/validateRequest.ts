import { AnyZodObject } from 'zod';
import { catchAsync } from '../utils/catch-async';

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};
