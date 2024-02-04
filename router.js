import process from 'process';

export const router = async (command) => {
  const [ type, ...args ] = command.split(' ')

  switch (type) {
    case '.exit':
      process.exit()
    default:
      throw new Error('invalid')
  }
}
