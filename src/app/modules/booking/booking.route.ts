import { Router } from 'express';
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
} from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createBookingValidationSchema,
  updateBookingValidationSchema,
} from './booking.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  createBooking,
);
router.get('/', auth(USER_ROLE.admin), getAllBookings);
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateBookingValidationSchema),
  updateBooking,
);
router.delete('/:id', auth(USER_ROLE.admin), deleteBooking);

export const BookingRoute = router;
