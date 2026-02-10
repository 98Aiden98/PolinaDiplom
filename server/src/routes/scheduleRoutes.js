import { Router } from 'express';
import {
  listSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule
} from '../controllers/scheduleController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', listSchedule);
router.post('/', authMiddleware, createSchedule);
router.put('/:id', authMiddleware, updateSchedule);
router.delete('/:id', authMiddleware, deleteSchedule);

export default router;
