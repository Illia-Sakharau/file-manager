import os from 'os'

export const osRouter = (command) => {
  switch (command) {
    case '--EOL':
      eol()
      break;
    case '--cpus':
      cpus()
      break;
    case '--homedir':
      homedir()
      break;
    case '--username':
      username()
      break;
    case '--architecture':
      architecture()
      break;
    
    default:
      invalidError()
  }
}

const eol = () => {
  console.log(os.EOL);
}

const cpus = () => {
  const cpusInfo = os.cpus()
  console.log(`Overall amount of CPUS: ${cpusInfo.length}`)
  console.table(cpusInfo.map((cpu) => ({ Model: cpu.model, 'Clock rate': (cpu.speed / 1000) + ' GHz'})));
}

const homedir = () => {
  console.log(os.homedir());
}

const username = () => {
  console.log(os.userInfo().username);
}

const architecture = () => {
  console.log(os.arch());
}
