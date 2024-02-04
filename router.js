import process from 'process';
import { resolve } from 'path';

import { currentPath } from './utils/nwd.js';
import { fileExistChecker } from './utils/existChecker.js';
import { up, cd, ls } from './utils/nwd.js';
import { cat } from './utils/fs.js';

export const router = async (command) => {
  const [ type, ...args ] = command.split(' ')

  switch (type) {
    case '.exit':
      process.exit()
    
    // Navigation & working directory (nwd)
    case 'up':
      up()
      break;
    case 'cd':
      await cd(args)
      break;
    case 'ls':
      await ls()
      break;
        
    // Basic operations with files
    case 'cat':
      if (args.length !== 1) throw new Error('invalid');
      const filePath = await fileExistChecker(resolve(currentPath, ...args))
      await cat(filePath)
      break;
    
    

    default:
      throw new Error('invalid')
  }
}
