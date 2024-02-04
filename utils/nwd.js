import os from 'os';
import { resolve } from 'path';

export let currentPath = os.homedir();

export const up = () => {
  currentPath = resolve(currentPath, '..')
}
