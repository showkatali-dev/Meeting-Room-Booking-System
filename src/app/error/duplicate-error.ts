/* eslint-disable @typescript-eslint/no-explicit-any */
import { IErrorMessage, IGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const field = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];

  const extractedMessage = `${field} ${value}`;

  const errorMessages: IErrorMessage[] = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    success: false,
    message: `${extractedMessage} is already exists`,
    errorMessages,
  };
};

export default handleDuplicateError;
