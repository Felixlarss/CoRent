import { Router } from 'express';
import {
  addRoom,
  getAllRooms,
  getRoomById,
} from '../controllers/roomController.ts';
import authMiddleware from './authMiddleweare.ts';

const router = Router();

router.get('/rooms', authMiddleware, getAllRooms);
router.get('/room/:room_id', authMiddleware, getRoomById);
router.post('/room', addRoom);

export default router;
