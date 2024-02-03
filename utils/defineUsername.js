const ANON_NAME = 'Anonim';

export const defineUsername = (argv) => {
  const arg = argv.find((arg) => arg.startsWith('--username'))
  const username = arg ? arg.split('=')[1] : ANON_NAME

  return username
}