import httpStatus from 'http-status';
import AppError from '../../error/app-error';
import { Slot } from '../slot/slot.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import mongoose from 'mongoose';

export const createBookingIntoDB = async (payload: IBooking) => {
  const availableSlots = await Slot.find({ room: payload.room }).lean();

  if (!availableSlots.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  payload.slots.forEach((slot) => {
    if (!availableSlots.some((s) => s._id.toString() === slot.toString())) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Slot ${slot} is not available`,
      );
    }
  });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await Booking.create([payload], { session });

    if (!result.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create booking. Please try again',
      );
    }

    const bookedSlots = await Slot.updateMany(
      {
        _id: { $in: payload.slots },
      },
      {
        $set: {
          isBooked: true,
        },
      },
      {
        session,
      },
    );

    if (bookedSlots.modifiedCount !== payload.slots.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create booking. Please try again',
      );
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

export const gelAllBookingsFromDB = async () => {
  const result = await Booking.find();
  return result;
};

export const getUserBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId });
  return result;
};

export const updateBookingIntoDB = async (
  id: string,
  payload: Partial<IBooking>,
) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const deleteBookingByIdFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
