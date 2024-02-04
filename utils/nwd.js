import os from 'os';
import { resolve } from 'path';
import { folderExistChecker } from './existChecker.js';

export let currentPath = os.homedir();

export const up = () => {
  currentPath = resolve(currentPath, '..');
}

export const cd = async (path) => {
  if (path.length > 1) throw new Error('invalid');
  const newPath = resolve(currentPath, path[0])
  currentPath = await folderExistChecker(newPath);
}
