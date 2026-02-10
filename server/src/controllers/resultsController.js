import MatchResult from '../models/MatchResult.js';

export async function listResults(req, res, next) {
  try {
    const items = await MatchResult.find().sort({ dateTime: -1 });
    return res.json(items);
  } catch (err) {
    return next(err);
  }
}

export async function createResult(req, res, next) {
  try {
    const { dateTime, opponent, ourScore, theirScore, competition, notes } = req.body;
    if (!dateTime || !opponent || ourScore === undefined || theirScore === undefined) {
      return res.status(400).json({ message: 'dateTime, opponent, ourScore, theirScore are required' });
    }
    const item = await MatchResult.create({
      dateTime,
      opponent,
      ourScore,
      theirScore,
      competition,
      notes
    });
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
}

export async function updateResult(req, res, next) {
  try {
    const item = await MatchResult.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Result not found' });

    const { dateTime, opponent, ourScore, theirScore, competition, notes } = req.body;
    if (dateTime !== undefined) item.dateTime = dateTime;
    if (opponent !== undefined) item.opponent = opponent;
    if (ourScore !== undefined) item.ourScore = ourScore;
    if (theirScore !== undefined) item.theirScore = theirScore;
    if (competition !== undefined) item.competition = competition;
    if (notes !== undefined) item.notes = notes;

    await item.save();
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function deleteResult(req, res, next) {
  try {
    const item = await MatchResult.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Result not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
}
