import { Router } from 'express';
import { listGallery, uploadImage, deleteImage } from '../controllers/galleryController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', listGallery);
router.post('/upload', authMiddleware, upload.single('image'), uploadImage);
router.delete('/:id', authMiddleware, deleteImage);

export default router;
