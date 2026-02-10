import path from 'path';

const cwd = process.cwd();
const isServerDir = cwd.toLowerCase().endsWith(`${path.sep}server`);
export const rootDir = isServerDir ? path.resolve(cwd, '..') : cwd;
export const uploadsDir = path.resolve(rootDir, 'uploads');
