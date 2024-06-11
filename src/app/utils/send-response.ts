import { Response } from 'express';

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  token?: string;
  data: T;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).send(data);
};
