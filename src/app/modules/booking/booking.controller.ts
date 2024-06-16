import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catch-async';
import { sendResponse } from '../../utils/send-response';
import {
  createBookingIntoDB,
  deleteBookingByIdFromDB,
  gelAllBookingsFromDB,
  updateBookingIntoDB,
} from './booking.service';
import AppError from '../../error/app-error';

export const createBooking = catchAsync(async (req, res) => {
  const result = await createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

export const getAllBookings = catchAsync(async (req, res) => {
  const result = await gelAllBookingsFromDB();
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

export const updateBooking = catchAsync(async (req, res) => {
  const result = await updateBookingIntoDB(req.params.id as string, req.body);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

export const deleteBooking = catchAsync(async (req, res) => {
  const result = await deleteBookingByIdFromDB(req.params.id as string);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});
