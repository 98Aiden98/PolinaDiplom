import { Router } from 'express';
import {
  listTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadTeamPhoto
} from '../controllers/teamController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', listTeam);
router.post('/upload', authMiddleware, upload.single('image'), uploadTeamPhoto);
router.post('/', authMiddleware, createTeamMember);
router.put('/:id', authMiddleware, updateTeamMember);
router.delete('/:id', authMiddleware, deleteTeamMember);

export default router;
