import { Router } from 'express';
import { createSlot, getAvailableSlots } from './slot.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { createSlotValidationSchema } from './slot.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createSlotValidationSchema),
  createSlot,
);
router.get('/availability', getAvailableSlots);

export const SlotRoute = router;
