import { Router } from 'express';
import { createSlot, getAvailableSlots } from './slot.controller';

const router = Router();

router.post('/', createSlot);
router.get('/availability', getAvailableSlots);

export const SlotRoute = router;
