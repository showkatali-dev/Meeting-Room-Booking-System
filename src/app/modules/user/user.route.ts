import { Router } from 'express';
import { createUser, loginUser } from './user.controller';

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

export const UserRoute = router;
