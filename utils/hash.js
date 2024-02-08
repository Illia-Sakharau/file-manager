import { createReadStream } from 'fs';
import { createHash } from "crypto";
import { pipeline } from 'stream/promises';

export const calculateHash = async (filePath) => {
    const hash = createHash('sha256');
    const input = createReadStream(filePath);

    await pipeline(input, hash, { end: false });
    console.log(hash.digest('hex'));
};