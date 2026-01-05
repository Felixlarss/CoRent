import { Router } from 'express';
import { createMemberRoom } from '../controllers/memberRoomController.ts';

const router = Router();

router.post('/member_room', createMemberRoom);

export default router;
