import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Логин и пароль обязательны' });
    }
    const user = await AdminUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '12h'
    });
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}

export async function seedAdmin(req, res, next) {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'Недоступно в продакшене' });
    }
    const { username = 'admin', password = 'admin123' } = req.body || {};
    const existing = await AdminUser.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: 'Администратор уже существует' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await AdminUser.create({ username, passwordHash });
    return res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    return next(err);
  }
}
