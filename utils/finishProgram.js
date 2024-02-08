import { GOODBYE_MESSAGE } from '../dictionary.js'

export const finishProgram = (username) => {
  console.log();
  console.log(GOODBYE_MESSAGE(username));
  process.exit()
}
