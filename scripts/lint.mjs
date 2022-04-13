#!/usr/bin/env zx

import { $, chalk } from './utils/enhanceZX.mjs'
import { checkProcess } from './utils/log.mjs'

import Argv, { isFalse } from './utils/enhanceArgv.mjs'

const { all, markdownlint, js, sortPackageJson, build } = Argv

$.verbose = false

console.warn(chalk.blueBright('🎬🎬🎬 linting'))

/**
 * get lint is need check by argv
 * @param {*} needCheck
 * @returns
 */
function getNeedCheckByArgv (needCheck) {
  if (isFalse(needCheck)) return false
  if (all) return true
  return true
}

const checkList = [
  // check markdownlint
  {
    content: 'markdownlint',
    checkFn: () => $`pnpm check:markdownlint`,
    needCheck: getNeedCheckByArgv(markdownlint)
  },
  // check js
  {
    content: 'js',
    checkFn: () => $`pnpm check:js`,
    needCheck: getNeedCheckByArgv(js)
  },
  // check sort-package-json
  {
    content: 'sort-package-json',
    checkFn: () => $`pnpm check:sort-package-json`,
    needCheck: getNeedCheckByArgv(sortPackageJson)
  },
  // check build
  {
    content: 'build',
    checkFn: () => $`pnpm build`,
    needCheck: getNeedCheckByArgv(build)
  }
]

for (const checkItem of checkList) {
  const { content, checkFn, needCheck } = checkItem
  if (!needCheck) continue
  try {
    await checkProcess(content, async () => await checkFn())
  } catch (error) {
    console.error(chalk.redBright(error.stderr || error.stdout))
    await $`exit 1`
  }
}

console.warn(chalk.greenBright('🎉🎉🎉 all passed'))
