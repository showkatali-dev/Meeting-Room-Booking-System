/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export interface ISlot {
  room: mongoose.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
}

export interface ISlotModel extends Model<ISlot> {
  isSlotExists(
    room: mongoose.Types.ObjectId,
    date: string,
    startTime: string,
    endTime: string,
  ): Promise<boolean>;
}
