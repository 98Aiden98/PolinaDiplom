import mongoose from 'mongoose';
import slugify from 'slugify';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    slug: { type: String, unique: true, index: true }
  },
  { timestamps: true }
);

async function generateUniqueSlug(doc) {
  const base = slugify(doc.title, { lower: true, strict: true }) || 'news';
  let slug = base;
  let counter = 1;
  const News = mongoose.model('News');
  while (await News.exists({ slug, _id: { $ne: doc._id } })) {
    counter += 1;
    slug = `${base}-${counter}`;
  }
  return slug;
}

newsSchema.pre('save', async function setSlug(next) {
  if (!this.isModified('title') && this.slug) return next();
  try {
    this.slug = await generateUniqueSlug(this);
    return next();
  } catch (err) {
    return next(err);
  }
});

newsSchema.pre('insertMany', async function setSlugs(...args) {
  const docs = Array.isArray(args[0]) ? args[0] : args[1];
  const next = typeof args[0] === 'function' ? args[0] : args[1];
  try {
    for (const doc of docs || []) {
      if (!doc.title) continue;
      if (doc.slug) continue;
      doc.slug = await generateUniqueSlug(doc);
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

export default mongoose.model('News', newsSchema);
