import { Router } from 'express';
import {
  listResults,
  createResult,
  updateResult,
  deleteResult
} from '../controllers/resultsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', listResults);
router.post('/', authMiddleware, createResult);
router.put('/:id', authMiddleware, updateResult);
router.delete('/:id', authMiddleware, deleteResult);

export default router;
