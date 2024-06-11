import { IUser, IUserModel } from './user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { bcrypt_salt_rounds } from '../../config/env.config';

const userSchema = new Schema<IUser, IUserModel>({
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(bcrypt_salt_rounds));
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email) {
  const user = await User.findOne({ email }).select('+password');
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  const result = await bcrypt.compare(plainTextPassword, hashedPassword);
  return result;
};

export const User = model<IUser, IUserModel>('User', userSchema);
