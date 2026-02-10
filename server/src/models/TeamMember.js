import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    number: { type: Number, min: 0 },
    photoUrl: { type: String },
    bio: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', teamMemberSchema);
