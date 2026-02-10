import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('AdminUser', adminUserSchema);
