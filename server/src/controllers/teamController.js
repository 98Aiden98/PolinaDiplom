import TeamMember from '../models/TeamMember.js';

export async function listTeam(req, res, next) {
  try {
    const items = await TeamMember.find().sort({ fullName: 1 });
    return res.json(items);
  } catch (err) {
    return next(err);
  }
}

export async function createTeamMember(req, res, next) {
  try {
    const { fullName, position, number, photoUrl, bio } = req.body;
    if (!fullName || !position) {
      return res.status(400).json({ message: 'fullName and position are required' });
    }
    const item = await TeamMember.create({ fullName, position, number, photoUrl, bio });
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
}

export async function updateTeamMember(req, res, next) {
  try {
    const item = await TeamMember.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Team member not found' });

    const { fullName, position, number, photoUrl, bio } = req.body;
    if (fullName !== undefined) item.fullName = fullName;
    if (position !== undefined) item.position = position;
    if (number !== undefined) item.number = number;
    if (photoUrl !== undefined) item.photoUrl = photoUrl;
    if (bio !== undefined) item.bio = bio;

    await item.save();
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function deleteTeamMember(req, res, next) {
  try {
    const item = await TeamMember.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Team member not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
}

export async function uploadTeamPhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;
    return res.status(201).json({ fileName, filePath });
  } catch (err) {
    return next(err);
  }
}
