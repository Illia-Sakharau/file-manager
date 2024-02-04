import { access, stat } from 'fs/promises';

export const folderExistChecker = async (path) => {
  await access(path);
  const isDirectory = (await stat(path)).isDirectory();
  if (!isDirectory) throw new Error('It is not folder');
  return path
}

export const fileExistChecker = async (path) => {
  await access(path);
  const isFile = (await stat(path)).isFile();
  if (!isFile) throw new Error('It is not file');
  return path
}

export const fileNotExistChecker = async (path) => {
  try {
    await access(path);
  } catch (_) {
    return path
  }
  throw new Error('It is not file');
}
