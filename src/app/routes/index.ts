import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { RoomRoute } from '../modules/room/room.route';
import { SlotRoute } from '../modules/slot/slot.route';
import { BookingRoute } from '../modules/booking/booking.route';
import { MyBookingRoute } from '../modules/myBooking/myBooking.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/rooms',
    route: RoomRoute,
  },
  {
    path: '/slots',
    route: SlotRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
  {
    path: '/my-bookings',
    route: MyBookingRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
