import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fs, chalk } from './enhanceZX.mjs'
import Argv from './enhanceArgv.mjs'
import { supportPackageManagerList, NPM, NPM_LOCK, PNPM, PNPM_LOCK, YARN, YARN_LOCK, CNPM } from '../constants/package-manager.mjs'

const { existsSync } = fs

/** Checking if the package manager is valid. */
function checkValidPackageManager (packageManager) {
  if (!packageManager) return false

  if (supportPackageManagerList.includes(packageManager)) return true

  console.error(chalk.redBright(`Error: "${packageManager}" is not a valid package managerr. Available package managers are: ${supportPackageManagerList.join(', ')}`))
  return false
}

/**
 * get the package manager from the process.env.npm_config_user_agent, support npm, cnpm, pnpm, yarn
 * @returns {{name: string, version: string}}
 */
function getPackageManagerFormUserAgent () {
  if (!process.env.npm_config_user_agent) return undefined

  const [originName, version] = process.env.npm_config_user_agent?.split(/\s/)?.[0].split('/') || []
  const name = originName === 'npminstall' ? CNPM : originName

  return {
    name,
    version
  }
}

const checkModulesPathExists = (fileName) => {
  const __dirname = fileURLToPath(dirname(import.meta.url))
  console.log('__dirname', __dirname, join(__dirname, '../../node_modules', fileName))
  return existsSync(join(__dirname, '../../node_modules', fileName))
}

/** detect the package manager from argv then from the project lock file. */
function detectExpectPackageManager () {
  const [allowPackageManager] = Argv._

  if (allowPackageManager && checkValidPackageManager(allowPackageManager)) return allowPackageManager

  if (existsSync(PNPM_LOCK)) {
    return PNPM
  } else if (existsSync(YARN_LOCK) || checkModulesPathExists('.yarn-integrity')) {
    return YARN
  } else if (existsSync(NPM_LOCK) || checkModulesPathExists('.pnpm')) {
    return NPM
  }

  console.error(chalk.redBright('Error: No lock file (package-lock.json, yarn.lock, pnpm-lock.yaml) found'))
  return ''
}

export {
  getPackageManagerFormUserAgent as getProgressPackageManager,
  detectExpectPackageManager,
  checkValidPackageManager
}

export default getPackageManagerFormUserAgent
