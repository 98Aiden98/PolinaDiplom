import { Router } from 'express';
import {
  listNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  uploadNewsCover
} from '../controllers/newsController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', listNews);
router.get('/slug/:slug', getNewsBySlug);
router.post('/upload', authMiddleware, upload.single('image'), uploadNewsCover);
router.get('/:id', getNewsById);
router.post('/', authMiddleware, createNews);
router.put('/:id', authMiddleware, updateNews);
router.delete('/:id', authMiddleware, deleteNews);

export default router;
