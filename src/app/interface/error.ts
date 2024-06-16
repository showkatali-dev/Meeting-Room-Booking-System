export interface IErrorMessage {
  path: string | number;
  message: string;
}

export interface IGenericErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: IErrorMessage[];
}
