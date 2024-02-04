import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { SUCCESS_MESSAGE } from '../dictionary.js'

const brotli = async ({ srcPath, destPath, isCompress }) => {
  const action = isCompress ? createBrotliCompress() : createBrotliDecompress();
  const input = createReadStream(srcPath);
  const output = createWriteStream(destPath);

  await pipeline(input, action, output, { end: false });
}

export const comperessBrotli = async (srcPath, destPath) => {
  await brotli({ srcPath, destPath, isCompress: true })
  console.log(SUCCESS_MESSAGE);
}

export const decomperessBrotli = async (srcPath, destPath) => {
  await brotli({ srcPath, destPath, isCompress: false })
  console.log(SUCCESS_MESSAGE);
}