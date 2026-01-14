import { Router } from 'express';
import {
  addRoom,
  getAllRooms,
  getRoomById,
  getRoomsById,
} from '../controllers/roomController.js';
import authMiddleware from './authMiddleweare.js';

const router = Router();

router.get('/rooms', authMiddleware, getAllRooms);
router.get('/rooms/:room_house_id', authMiddleware, getRoomsById);
router.get('/room/:room_id', authMiddleware, getRoomById);
router.post('/room', addRoom);

export default router;
