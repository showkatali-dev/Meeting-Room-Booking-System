import { Router } from 'express';
import { createUser, loginUser } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = Router();

router.post('/signup', validateRequest(createUserValidationSchema), createUser);
router.post('/login', loginUser);

export const UserRoute = router;
