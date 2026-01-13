import { Router } from 'express';
import { getAllMembers, getMemberById, createMember, deleteMember, updateMember, confirmMember, } from '../controllers/memberController.ts';
import authMiddleware from './authMiddleweare.ts';
const router = Router();
router.get('/members', authMiddleware, getAllMembers);
router.get('/member/:member_id', authMiddleware, getMemberById);
router.post('/member', createMember);
router.post('/member/auth', confirmMember);
router.delete('/member/:member_id', authMiddleware, deleteMember);
router.patch('/member/:member_id', authMiddleware, updateMember);
export default router;
//# sourceMappingURL=memberRoutes.js.map