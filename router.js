import process from 'process';
import {x} from './utils/nwd.js';

export const router = async (command) => {
  const [ type, ...args ] = command.split(' ')

  switch (type) {
    case '.exit':
      process.exit()
    case 'test':
      x()
    default:
      throw new Error('invalid')
  }
}
