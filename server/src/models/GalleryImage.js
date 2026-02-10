import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    title: { type: String, trim: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('GalleryImage', galleryImageSchema);
