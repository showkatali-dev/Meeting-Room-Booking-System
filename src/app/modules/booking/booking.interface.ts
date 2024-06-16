import mongoose from 'mongoose';

export interface IBooking {
  room: mongoose.Types.ObjectId;
  slots: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  date: string;
  totalAmount: number;
  isConfirmed?: 'confirmed' | 'unconfirmed' | 'cancelled';
  isDeleted: boolean;
}
