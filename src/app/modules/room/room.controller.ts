import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catch-async';
import { sendResponse } from '../../utils/send-response';
import {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getRoomByIdFromDB,
  softDeleteRoomByIdFromDB,
  updateRoomByIdIntoDB,
} from './room.service';
import AppError from '../../error/app-error';

export const createRoom = catchAsync(async (req, res) => {
  const result = await createRoomIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: result,
  });
});

export const getAllRooms = catchAsync(async (req, res) => {
  const result = await getAllRoomsFromDB();

  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

export const getRoomById = catchAsync(async (req, res) => {
  const result = await getRoomByIdFromDB(req.params.id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  });
});

export const updateRoomById = catchAsync(async (req, res) => {
  const result = await updateRoomByIdIntoDB(req.params.id, req.body);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});

export const softDeleteRoomById = catchAsync(async (req, res) => {
  const result = await softDeleteRoomByIdFromDB(req.params.id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});
