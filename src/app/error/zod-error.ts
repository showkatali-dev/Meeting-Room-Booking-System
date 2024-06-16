import { ZodError } from 'zod';
import { IErrorMessage, IGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorMessages: IErrorMessage[] = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    success: false,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleZodError;
