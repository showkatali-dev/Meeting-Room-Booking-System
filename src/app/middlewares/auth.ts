import httpStatus from 'http-status';
import AppError from '../error/app-error';
import { IUserRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catch-async';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwt_secret } from '../config/env.config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(token, jwt_secret as string) as JwtPayload;

    const { userId, role } = decoded;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
