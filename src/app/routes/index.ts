import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: UserRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
