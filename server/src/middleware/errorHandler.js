export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  const details = err.details || undefined;
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', details: err.errors });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key error', details: err.keyValue });
  }
  return res.status(status).json({ message, details });
}
