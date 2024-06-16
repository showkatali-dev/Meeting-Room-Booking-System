import { Router } from 'express';
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  softDeleteRoomById,
} from './room.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createRoomValidationSchema,
  updateRoomValidationSchema,
} from './room.validation';

const router = Router();

router.get('/', getAllRooms);
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createRoomValidationSchema),
  createRoom,
);
router.get('/:id', getRoomById);
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateRoomValidationSchema),
  updateRoomById,
);
router.delete('/:id', auth(USER_ROLE.admin), softDeleteRoomById);

export const RoomRoute = router;
