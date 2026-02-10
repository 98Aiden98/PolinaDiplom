import mongoose from 'mongoose';

const scheduleItemSchema = new mongoose.Schema(
  {
    dateTime: { type: Date, required: true },
    type: { type: String, enum: ['match', 'training'], required: true },
    opponent: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('ScheduleItem', scheduleItemSchema);
