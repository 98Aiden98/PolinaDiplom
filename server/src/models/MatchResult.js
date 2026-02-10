import mongoose from 'mongoose';

const matchResultSchema = new mongoose.Schema(
  {
    dateTime: { type: Date, required: true },
    opponent: { type: String, required: true, trim: true },
    ourScore: { type: Number, required: true, min: 0 },
    theirScore: { type: Number, required: true, min: 0 },
    competition: { type: String, trim: true },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('MatchResult', matchResultSchema);
