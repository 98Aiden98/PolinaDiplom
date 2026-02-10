import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { uploadsDir } from '../config/paths.js';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '');
    const base = path.basename(file.originalname || 'image', ext).replace(/\s+/g, '-');
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  if (!file.mimetype || !file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'));
  }
  return cb(null, true);
}

export const upload = multer({ storage, fileFilter });
