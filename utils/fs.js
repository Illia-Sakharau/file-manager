import { createReadStream } from 'fs';
import { stdout } from "process";
import { pipeline } from 'stream/promises';

export const cat = async (path) => {
  if (typeof(path) !== 'string') throw new Error('invalid');

  const input = createReadStream(path);
  await pipeline(input, stdout, { end: false });
  console.log();
}