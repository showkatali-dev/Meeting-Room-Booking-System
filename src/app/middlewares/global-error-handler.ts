import { ErrorRequestHandler } from 'express';
import { IErrorMessage } from '../interface/error';
import AppError from '../error/app-error';
import { node_env } from '../config/env.config';
import { ZodError } from 'zod';
import handleZodError from '../error/zod-error';
import handleValidationError from '../error/validation-error';
import handleCastError from '../error/cast-error';
import handleDuplicateError from '../error/duplicate-error';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IErrorMessage[] = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: node_env === 'development' ? err?.stack : null,
  });
};
