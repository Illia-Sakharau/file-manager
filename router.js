import process from 'process';
import { resolve } from 'path';

import { invalidError } from './utils/errorHandles.js'
import { currentPath } from './utils/nwd.js';
import { fileExistChecker } from './utils/existChecker.js';
import { up, cd, ls } from './utils/nwd.js';
import { cat, add } from './utils/fs.js';

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
      await cat(filePath)
      break;
    }
    case 'add': {
      if (args.length !== 1) invalidError();
      const filePath = resolve(currentPath, ...args)
      await add(filePath)
      break;
    }

    default:
      invalidError()
  }
}
