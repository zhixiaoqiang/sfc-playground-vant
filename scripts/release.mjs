#!/usr/bin/env zx

import { $, fs } from './utils/enhanceZX.mjs'
import Argv from './utils/enhanceArgv.mjs'

const packageJson = await fs.readFile(new URL('../package.json', import.meta.url))
const json = JSON.parse((String(packageJson)))

/**
 * --tagPublish set tagPublish to true, default true
 * --no-tagPublish set tagPublish to false or --tagPublish=false
 * --npmPublish set npmPublish to true, default false
 * --no-npmPublish set npmPublish to false or --npmPublish=false
 *
 * NOTE: pnpm args: pnpm xx -- --tagPublish --npmPublish
 */
const { tagPublish = true, npmPublish } = Argv

if (tagPublish) {
  await $`git tag v${json.version}`
  await $`git push origin --tags`
}
if (npmPublish) {
  await $`pnpm publish --access public`
}
