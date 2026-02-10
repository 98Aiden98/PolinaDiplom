import fs from 'fs';
import path from 'path';
import GalleryImage from '../models/GalleryImage.js';
import { uploadsDir } from '../config/paths.js';

export async function listGallery(req, res, next) {
  try {
    const items = await GalleryImage.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    return next(err);
  }
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    const { title } = req.body;
    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;
    const item = await GalleryImage.create({ fileName, filePath, title });
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
}

export async function deleteImage(req, res, next) {
  try {
    const item = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Image not found' });

    const absolutePath = path.resolve(uploadsDir, item.fileName);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
}
