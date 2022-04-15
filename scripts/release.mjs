#!/usr/bin/env zx

import { $, fs } from './utils/enhanceZX.mjs'
import Argv from './utils/enhanceArgv.mjs'

const { version } = await fs.readJSON('package.json')

/**
 * --tagPublish set tagPublish to true, default true
 * --no-tagPublish set tagPublish to false or --tagPublish=false
 * --pushRepo set pushRepo to true, default true
 * --no-pushRepo set pushRepo to false or --pushRepo=false
 * --npmPublish set npmPublish to true, default false
 * --no-npmPublish set npmPublish to false or --npmPublish=false
 *
 * NOTE: pnpm args: pnpm xx -- --tagPublish --pushRepo --npmPublish
 */
const { tagPublish = true, pushRepo = true, npmPublish } = Argv

if (tagPublish) {
  await $`git tag v${version}`
  await $`git push origin --tags`
}

if (pushRepo) {
  const currentBranch = await $`git branch --show-current`
  await $`git push origin ${currentBranch}`
}

if (npmPublish) {
  await $`pnpm publish --access public`
}
