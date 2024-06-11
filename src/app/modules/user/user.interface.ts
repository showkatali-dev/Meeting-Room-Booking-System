/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

export interface IUserModel extends Model<IUser> {
  isUserExistsByEmail(
    email: string,
  ): Promise<IUser & { _id: mongoose.Types.ObjectId }>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export interface IUserLogin {
  email: string;
  password: string;
}
