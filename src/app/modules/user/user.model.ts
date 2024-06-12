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

// to encrypt password before saving
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(bcrypt_salt_rounds));
  next();
});

// to remove password from response after user created
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// static method to get user by email
userSchema.statics.isUserExistsByEmail = async function (email) {
  const user = await User.findOne({ email }).select('+password');
  return user?.toObject();
};

// static method to check password match
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  const result = await bcrypt.compare(plainTextPassword, hashedPassword);
  return result;
};

export const User = model<IUser, IUserModel>('User', userSchema);
