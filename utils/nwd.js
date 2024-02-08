import os from 'os';
import { readdir, stat } from 'fs/promises';
import { resolve, join } from 'path';
import { folderExistChecker } from './existChecker.js';
import { invalidError } from './errorHandles.js';

export let currentPath = os.homedir();

export const up = () => {
  currentPath = resolve(currentPath, '..');
}

export const cd = async (path) => {
  if (typeof(path) !== 'string') invalidError();

  const newPath = resolve(currentPath, path);
  currentPath = await folderExistChecker(newPath);
}

export const ls = async () => {
  const folders = [];
  const files = [];
  const items = await readdir(currentPath);

  for (const item of items) {
    try {
      const stats = await stat(join(currentPath, item));
      const isDirectory = stats.isDirectory();
      const isFile = stats.isFile();
      if (isDirectory) folders.push({ Name: item, Type: 'directory' });
      if (isFile) files.push({ Name: item, Type: 'file' });      
    } catch (_) {}
  }

  folders.sort(sortLS)
  items.sort(sortLS)

  console.table([...folders, ...files])
}

const sortLS = (a, b) => {
  const nameA = `${a.Name}`.toLocaleLowerCase()
  const nameB = `${b.Name}`.toLocaleLowerCase()
  return nameA.localeCompare(nameB)
}
