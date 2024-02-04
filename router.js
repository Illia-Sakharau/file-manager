import process from 'process';
import { up } from './utils/nwd.js';

export const router = async (command) => {
  const [ type, ...args ] = command.split(' ')

  switch (type) {
    case '.exit':
      process.exit()
    
    // Navigation & working directory (nwd)
    case 'up':
      up()
      break;
    
    default:
      throw new Error('invalid')
  }
}
