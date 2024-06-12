import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catch-async';
import { sendResponse } from '../../utils/send-response';
import { createSlotIntoDB, getAvailableSlotsFromDB } from './slot.service';
import AppError from '../../error/app-error';

export const createSlot = catchAsync(async (req, res) => {
  const result = await createSlotIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

export const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await getAvailableSlotsFromDB(req.query);

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots retrieved successfully',
    data: result,
  });
});
