import mongoose from 'mongoose';

export interface ISlot {
  room: mongoose.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
}
