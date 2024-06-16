import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>({
  room: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  slots: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
      },
    ],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  isConfirmed: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'cancelled'],
    default: 'unconfirmed',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.pre('find', function (next) {
  this.where({ idDeleted: { $ne: true } });
  next();
});

export const Booking = model<IBooking>('Booking', bookingSchema);
