import mongoose from 'mongoose';
import { getRoomByIdFromDB } from '../room/room.service';
import { ISlot } from './slot.interface';
import { Slot } from './slot.model';
import { generateSlotTimes } from './slot.utils';
import AppError from '../../error/app-error';
import httpStatus from 'http-status';

export const createSlotIntoDB = async (payload: ISlot) => {
  const room = await getRoomByIdFromDB(String(payload.room));

  if (!room) {
    throw new Error('Room not found');
  }

  const { startTime, endTime } = payload;
  const slotDuration = 60; // 60 minutes

  const slotTimes = generateSlotTimes(startTime, endTime, slotDuration);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result: ISlot[] = [];

    for (const slotTime of slotTimes) {
      const slot_data: ISlot = {
        ...payload,
        room: room._id,
        ...slotTime,
      };

      // check if the slot already exists
      const isAlreadyExists = await Slot.isSlotExists(
        slot_data.room,
        slot_data.date,
        slot_data.startTime,
        slot_data.endTime,
      );

      if (isAlreadyExists) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `${slot_data.date} ${slot_data.startTime}:${slot_data.endTime} slot already exists for this room`,
        );
      }

      const slot = await Slot.create([slot_data], { session });

      if (!slot.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create slots');
      }

      result.push(slot[0]);
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const getAvailableSlotsFromDB = async (
  query: Record<string, unknown>,
) => {
  if (query.roomId) {
    query.room = query.roomId;
    delete query.roomId;
  }

  const result = await Slot.find(query).populate('room');
  return result;
};
