import { createReadStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { stdout } from "process";
import { pipeline } from 'stream/promises';
import { invalidError } from './errorHandles.js';
import { SUCCESS_MESSAGE } from '../dictionary.js'

export const cat = async (path) => {
  if (typeof(path) !== 'string') invalidError();

  const input = createReadStream(path);
  await pipeline(input, stdout, { end: false });
  console.log();
}

export const add = async (filePath) => {
  if (typeof(filePath) !== 'string') invalidError();

  await fs.writeFile(filePath, '', { flag: 'wx' })
  console.log(SUCCESS_MESSAGE);
}
