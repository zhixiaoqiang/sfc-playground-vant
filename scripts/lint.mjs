#!/usr/bin/env zx

import { $, chalk } from './utils/enhanceZX.mjs'
import { checkProcess } from './utils/log.mjs'

$.verbose = false

console.warn(chalk.blueBright('🎬🎬🎬 linting'))

const checkList = [
  // check markdownlint
  {
    content: 'markdownlint',
    checkFn: () => $`pnpm check:markdownlint`
  },
  // check js
  {
    content: 'js',
    checkFn: () => $`pnpm check:js`
  },
  // check sort-package-json
  {
    content: 'sort-package-json',
    checkFn: () => $`pnpm check:sort-package-json`
  },
  // check build
  {
    content: 'build',
    checkFn: () => $`pnpm build`
  }
]

for (const checkItem of checkList) {
  const { content, checkFn } = checkItem
  try {
    await checkProcess(content, async () => await checkFn())
  } catch (error) {
    console.error(chalk.redBright(error.stderr || error.stdout))
    await $`exit 1`
  }
}

console.warn(chalk.greenBright('🎉🎉🎉 all passed'))
