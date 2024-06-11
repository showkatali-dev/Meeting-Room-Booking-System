import { IUser } from './user.interface';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>('User', userSchema);
