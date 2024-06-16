import mongoose from 'mongoose';
import { IErrorMessage, IGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorMessages: IErrorMessage[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    success: false,
    message: 'Invalid ID',
    errorMessages,
  };
};

export default handleCastError;
