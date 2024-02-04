import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';
import { stdout } from "process";
import { pipeline } from 'stream/promises';
import { invalidError } from './errorHandles.js';
import { SUCCESS_MESSAGE } from '../dictionary.js'

export const readFile = async (path) => {
  if (typeof(path) !== 'string') invalidError();

  const input = createReadStream(path);
  await pipeline(input, stdout, { end: false });
  console.log();
}

export const addFile = async (filePath) => {
  if (typeof(filePath) !== 'string') invalidError();

  await fs.writeFile(filePath, '', { flag: 'wx' })
  console.log(SUCCESS_MESSAGE);
}

export const renameFile = async (filePath, newFilePath) => {
  if (typeof(filePath) !== 'string' || typeof(newFilePath) !== 'string') invalidError();

  await fs.rename(filePath, newFilePath)
  console.log(SUCCESS_MESSAGE);
}

export const copyFile = async (filePath, newFilePath) => {
  if (typeof(filePath) !== 'string' || typeof(newFilePath) !== 'string') invalidError();

  const from = createReadStream(filePath);
  const to = createWriteStream(newFilePath);
  await pipeline(from, to, { end: false });
  console.log(SUCCESS_MESSAGE);
}

export const deleteFile = async (filePath) => {
  if (typeof(filePath) !== 'string') invalidError();

  await fs.rm(filePath)
  console.log(SUCCESS_MESSAGE);
}
