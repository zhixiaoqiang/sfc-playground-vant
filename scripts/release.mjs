#!/usr/bin/env zx

import { $, fs, argv } from './utils/enhanceZX.mjs'

const json = JSON.parse(await fs.readFile(new URL('../package.json', import.meta.url)))

/**
 * --tagPublish set tagPublish to true, default true
 * --no-tagPublish set tagPublish to false
 * --npmPublish set npmPublish to true, default false
 * --no-npmPublish set npmPublish to false
 *
 * NOTE: pnpm args: pnpm xx -- --tagPublish --npmPublish
 */
const { tagPublish = true, npmPublish } = argv

if (tagPublish) {
  await $`git tag v${json.version}`
  await $`git push origin --tags`
}
if (npmPublish) {
  await $`pnpm publish --access public`
}
