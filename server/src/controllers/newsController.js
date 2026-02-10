import News from '../models/News.js';

export async function listNews(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '5', 10), 1), 50);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      News.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      News.countDocuments()
    ]);

    return res.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    return next(err);
  }
}

export async function getNewsById(req, res, next) {
  try {
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'News not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function getNewsBySlug(req, res, next) {
  try {
    const item = await News.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: 'News not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function createNews(req, res, next) {
  try {
    const { title, content, coverImageUrl } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const item = await News.create({ title, content, coverImageUrl });
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
}

export async function updateNews(req, res, next) {
  try {
    const { title, content, coverImageUrl } = req.body;
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'News not found' });

    if (title !== undefined) item.title = title;
    if (content !== undefined) item.content = content;
    if (coverImageUrl !== undefined) item.coverImageUrl = coverImageUrl;

    await item.save();
    return res.json(item);
  } catch (err) {
    return next(err);
  }
}

export async function deleteNews(req, res, next) {
  try {
    const item = await News.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'News not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err);
  }
}

export async function uploadNewsCover(req, res, next) {
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
