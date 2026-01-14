import { Router } from 'express';
import { createMemberRoom, updateMemberRoomById, deleteMemberRoomById, } from '../controllers/memberRoomController.js';
const router = Router();
router.post('/member_room', createMemberRoom);
router.delete('/member_room/:member_id', deleteMemberRoomById);
router.patch('/member_room/:member_id', updateMemberRoomById);
export default router;
//# sourceMappingURL=memberRoomRoutes.js.map