import { Router } from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  deleteMember,
  updateMember,
} from '../controllers/memberController.ts';

const router = Router();

router.get('/members', getAllMembers);
router.get('/member/:member_id', getMemberById);
router.post('/member', createMember);
router.delete('/member/:member_id', deleteMember);
router.patch('/member/:member_id', updateMember);

export default router;
