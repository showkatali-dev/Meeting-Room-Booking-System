import { catchAsync } from '../../utils/catch-async';
import { createUserIntoDB, loginUserService } from './user.service';
import { sendResponse } from '../../utils/send-response';
import httpStatus from 'http-status';

export const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: result.token,
    data: result.data,
  });
});
