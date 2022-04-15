import { chalk } from './utils/enhanceZX.mjs'
import { getProgressPackageManager, detectExpectPackageManager, checkValidPackageManager } from './utils/package-manager.mjs'
import { supportPackageManagerList } from './constants/package-manager.mjs'

const expectPM = detectExpectPackageManager()

const log = (content) => {
  console.log('\n', content, '\n')
}

const getNoteContent = (length = 3) => chalk.yellowBright(chalk.bold(Array.from({ length: length }, () => '⚠️')))

const consoleNoteInfo = (content) => {
  return log(`${getNoteContent()} ${content}`)
}

async function checkExpectPM () {
  function getSupportPMListContent (content) {
    const contentText = content ? ` ${content} ` : ''
    return chalk.redBright(`${contentText}<${supportPackageManagerList.join('|')}>`)
  }

  if (!expectPM) {
    consoleNoteInfo(`Please specify the wanted package manager: ${getSupportPMListContent('only-allow')}`)
    process.exit(1)
  }

  if (!checkValidPackageManager(expectPM)) {
    consoleNoteInfo(`"${expectPM}" is not a valid package manager. Available package managers are: ${getSupportPMListContent()}`)
    process.exit(1)
  }
}

async function main () {
  await checkExpectPM()
  const progressPM = getProgressPackageManager()

  if (progressPM.name !== expectPM) {
    switch (expectPM) {
      case 'npm':
        log('Use "npm install" for installation in this project')
        break
      case 'cnpm':
        log('Use "cnpm install" for installation in this project')
        break
      case 'pnpm':
        log('Use "pnpm install" for installation in this project. If you don\'t have pnpm, install it via "npm i -g pnpm". For more details, go to https://pnpm.io/')
        break
      case 'yarn':
        log('Use "yarn" for installation in this project. If you don\'t have Yarn, install it via "npm i -g yarn". For more details, go to https://yarnpkg.com/')
        break
    }
    process.exit(1)
  }
}

await main()
