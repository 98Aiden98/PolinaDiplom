import ScheduleItem from '../models/ScheduleItem.js';

export async function listSchedule(req, res, next) {
  try {
    const items = await ScheduleItem.find().sort({ dateTime: 1 });
    return res.json(items);
  } catch (err) {
    return next(err);
  }
}

export async function createSchedule(req, res, next) {
  try {
    const { dateTime, type, opponent, location, notes } = req.body;
    if (!dateTime || !type || !location) {
      return res.status(400).json({ message: 'dateTime, type, location are required' });
    }
    const item = await ScheduleItem.create({ dateTime, type, opponent, location, notes });
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
}

export async function updateSchedule(req, res, next) {
  try {
    const item = await ScheduleItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Schedule item not found' });

    const { dateTime, type, opponent, location, notes } = req.body;
    if (dateTime !== undefined) item.dateTime = dateTime;
    if (type !== undefined) item.type = type;
    if (opponent !== undefined) item.opponent = opponent;
    if (location !== undefined) item.location = location;
    if (notes !== undefined) item.notes = notes;

    await item.save();
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function deleteSchedule(req, res, next) {
  try {
    const item = await ScheduleItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Schedule item not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
}
