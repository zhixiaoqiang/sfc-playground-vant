#!/usr/bin/env zx

import { $, fs } from './utils/enhanceZX.mjs'

const json = JSON.parse(await fs.readFile(new URL('../package.json', import.meta.url)))

await $`git tag v${json.version}`
await $`git push origin --tags`
