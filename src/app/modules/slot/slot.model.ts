import { ISlot, ISlotModel } from './slot.interface';
import { Schema, model } from 'mongoose';

const slotSchema = new Schema<ISlot, ISlotModel>({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

slotSchema.pre('find', function (next) {
  this.where({ isBooked: { $ne: true } });
  next();
});

slotSchema.statics.isSlotExists = async function (
  room,
  date,
  startTime,
  endTime,
) {
  const slot = await this.findOne({ room, date, startTime, endTime });
  return !!slot;
};

export const Slot = model<ISlot, ISlotModel>('Slot', slotSchema);
