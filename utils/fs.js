import { createReadStream } from 'fs';
import { stdout } from "process";
import { pipeline } from 'stream/promises';
import { invalidError } from './errorHandles.js';

export const cat = async (path) => {
  if (typeof(path) !== 'string') invalidError();

  const input = createReadStream(path);
  await pipeline(input, stdout, { end: false });
  console.log();
}