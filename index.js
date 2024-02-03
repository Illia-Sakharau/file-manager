import process from 'process';
import { defineUsername } from './utils/defineUsername.js'

const fileManager = async () => {
  const username = defineUsername(process.argv)
  console.log(`Welcome to the File Manager, ${username}!`);
}

fileManager()
