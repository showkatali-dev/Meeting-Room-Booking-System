import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { RoomRoute } from '../modules/room/room.route';
import { SlotRoute } from '../modules/slot/slot.route';

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
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
