import process, { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline/promises';
import { router } from './router.js'
import { defineUsername } from './utils/defineUsername.js'
import { finishProgram } from './utils/finishProgram.js'
import { 
  QUESTION_MESSAGE, 
  GREETING_MESSAGE,
  INVALID_MESSAGE,
  FAILED_MESSAGE,
} from './dictionary.js';
import { currentPath } from './utils/nwd.js'


const fileManager = async () => {
  const username = defineUsername(process.argv);
  const rl = createInterface({ input, output });

  console.log(GREETING_MESSAGE(username));
  process.on('exit', () => finishProgram(username));

  while (true) {
    console.log();
    try {
      const command = await rl.question(QUESTION_MESSAGE(currentPath));
      await router(command)
    } catch (error) {
      if (error.message === 'invalid') {
        console.log(INVALID_MESSAGE);
      } else {
        console.log(FAILED_MESSAGE);
      }
    }
  }

}

fileManager()
