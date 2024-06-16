import mongoose from 'mongoose';
import { IErrorMessage, IGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorMessages: IErrorMessage[] = Object.values(err.errors).map(
    (val) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    success: false,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationError;
