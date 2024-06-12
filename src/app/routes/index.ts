import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { RoomRoute } from '../modules/room/room.route';

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
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
