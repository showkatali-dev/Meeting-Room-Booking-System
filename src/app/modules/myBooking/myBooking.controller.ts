import httpStatus from 'http-status';
import AppError from '../../error/app-error';
import { catchAsync } from '../../utils/catch-async';
import { sendResponse } from '../../utils/send-response';
import { getUserBookingsFromDB } from './myBooking.service';

export const getUsersBookings = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await getUserBookingsFromDB(userId);
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});
