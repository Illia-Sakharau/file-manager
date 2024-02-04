import os from 'os';

export let currentPath = os.homedir();

export const x = () => {
  currentPath = 123
}
