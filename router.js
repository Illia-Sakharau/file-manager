import process from 'process';
import { resolve } from 'path';

import { invalidError } from './utils/errorHandles.js'
import { currentPath } from './utils/nwd.js';
import { fileExistChecker, fileNotExistChecker } from './utils/existChecker.js';
import { up, cd, ls } from './utils/nwd.js';
import { readFile, addFile, renameFile, copyFile, deleteFile, moveFile } from './utils/fs.js';
import { osRouter } from './utils/os.js';
import { calculateHash } from './utils/hash.js';

export const router = async (command) => {
  const [ type, ...args ] = command.trim().split(' ')

  switch (type) {
    case '.exit':
      process.exit()
    
    // Navigation & working directory (nwd)
    case 'up':
      up()
      break;
    case 'cd':
      if (args.length !== 1) invalidError();
      await cd(...args)
      break;
    case 'ls':
      await ls()
      break;
        
    // Basic operations with files (fs)
    case 'cat': {
      if (args.length !== 1) invalidError();
      const filePath = await fileExistChecker(resolve(currentPath, ...args))
      await readFile(filePath)
      break;
    }
    case 'add': {
      if (args.length !== 1) invalidError();
      const filePath = resolve(currentPath, ...args)
      await addFile(filePath)
      break;
    }
    case 'rn': {
      if (args.length !== 2) invalidError();
      const filePath = await fileExistChecker(resolve(currentPath, args[0]))
      const newFilePath = await fileNotExistChecker(resolve(currentPath, args[1]))
      await renameFile(filePath, newFilePath)
      break;
    }
    case 'cp': {
      if (args.length !== 2) invalidError();
      const filePath = await fileExistChecker(resolve(currentPath, args[0]))
      const newFilePath = await fileNotExistChecker(resolve(currentPath, args[1]))
      await copyFile(filePath, newFilePath)
      break;
    }
    case 'rm': {
      if (args.length !== 1) invalidError();
      const filePath = await fileExistChecker(resolve(currentPath, args[0]))
      await deleteFile(filePath)
      break;
    }
    case 'mv': {
      if (args.length !== 2) invalidError();
      const filePath = await fileExistChecker(resolve(currentPath, args[0]))
      const newFilePath = await fileNotExistChecker(resolve(currentPath, args[1]))
      await moveFile(filePath, newFilePath)
      break;
    }

    // Operating system info (os)
    case 'os': {
      if (args.length !== 1) invalidError();
      osRouter(...args)
      break;
    }

    // Hash calculation (hash)
    case 'hash': {
      if (args.length !== 1) invalidError();
      const filePath = await fileExistChecker(resolve(currentPath, args[0]))
      await calculateHash(filePath)
      break;
    }

    default:
      invalidError()
  }
}
