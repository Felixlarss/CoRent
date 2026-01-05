import { Router } from 'express';
import { getAllRooms } from '../controllers/roomController.ts';

const router = Router();

router.get('/rooms', getAllRooms);

export default router;
