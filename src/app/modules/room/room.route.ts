import { Router } from 'express';
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  softDeleteRoomById,
} from './room.controller';

const router = Router();

router.get('/', getAllRooms);
router.post('/', createRoom);
router.get('/:id', getRoomById);
router.put('/:id', updateRoomById);
router.delete('/:id', softDeleteRoomById);

export const RoomRoute = router;
