import { Router } from 'express';
import { getUsersBookings } from './myBooking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get('/', auth(USER_ROLE.user), getUsersBookings);

export const MyBookingRoute = router;
