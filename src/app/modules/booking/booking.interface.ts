import mongoose from 'mongoose';

export interface IBooking {
  room: mongoose.Types.ObjectId;
  slots: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  totalAmount: number;
  isConfirmed: 'confirmed' | 'unconfirmed' | 'cancelled';
}
