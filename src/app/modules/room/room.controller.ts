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
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: [],
    });
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
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: null,
    });
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
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: null,
    });
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
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});
