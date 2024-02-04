import process, { stdin as input, stdout as output } from 'process';

export const router = async (command) => {
  const [ type, ...args ] = command.split(' ')

  switch (type) {
    case '.exit':
      process.exit()
    default:
      console.log(type);
      console.log(args);
  }

}