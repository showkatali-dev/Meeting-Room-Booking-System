import { jwt_expire_in, jwt_secret } from '../../config/env.config';
import AppError from '../../error/app-error';
import { IUser, IUserLogin } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import { sign } from 'jsonwebtoken';

export const createUserIntoDB = async (payload: IUser) => {
  const user = await User.create(payload);
  return user;
};

export const loginUserService = async (payload: IUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
  }

  const passwordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!passwordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'The password is incorrect');
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const token = sign(jwtPayload, jwt_secret as string, {
    expiresIn: jwt_expire_in as string,
  });

  // to remove password from response
  const { password, ...userWithoutPassword } = user;
  user.password = password;

  const result = {
    data: userWithoutPassword,
    token,
  };

  return result;
};
