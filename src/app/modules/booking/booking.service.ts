import httpStatus from 'http-status';
import AppError from '../../error/app-error';
import { Slot } from '../slot/slot.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Room } from '../room/room.model';

export const createBookingIntoDB = async (payload: IBooking) => {
  const room = await Room.findById(payload.room).lean();

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  // check available slots
  const availableSlots = await Slot.find({
    room: payload.room,
    date: payload.date,
  }).lean();

  if (!availableSlots.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Slot found');
  }

  // check if user not exist
  const user = await User.findById(payload.user).lean();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if any slot not available
  payload.slots.forEach((slot) => {
    const availableSlot = availableSlots.find(
      (s) => s._id.toString() === slot.toString(),
    );
    if (!availableSlot) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Slot ${slot} is not available`,
      );
    }
  });

  payload.totalAmount = room.pricePerSlot * payload.slots.length;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newBooking = await Booking.create([payload], { session });

    if (!newBooking.length) {
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

    const result = await Booking.populate(newBooking, {
      path: 'room slots user',
    });

    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const gelAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('room slots user');
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
