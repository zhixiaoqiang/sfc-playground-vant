import { File } from '@vue/repl'

export enum npmCdnEnum {
  jsdelivr = 'https://cdn.jsdelivr.net/npm',
  unpkg = 'https://unpkg.com',
  skypack = 'https://cdn.skypack.dev',
  cndjs = 'https://cdnjs.com/libraries'
}

export const DEFAULT_CDN = npmCdnEnum.jsdelivr

export const getVueRuntimeURL = (version: string) => `${DEFAULT_CDN}/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js`
export const getVueCompilerURL = (version: string) => `${DEFAULT_CDN}/@vue/compiler-sfc@${version}/dist/compiler-sfc.esm-browser.js`
export const getVantURL = (version?: string) => {
  if (version) {
    return `${DEFAULT_CDN}/vant@${version}/lib/vant.es.min.js`
  }

  return `${DEFAULT_CDN}/vant/lib/vant.es.min.js`
}

export const defaultMainFile = 'App.vue'
export const vantInjectPlugin = 'vant-inject-plugin.js'

export const vantImports = {
  vant: getVantURL(),
  '@vant/use': `${DEFAULT_CDN}/@vant/use/dist/index.esm.js`,
  '@vant/popperjs': `${DEFAULT_CDN}/@vant/popperjs/dist/esm/index.js`,
  '@vant/touch-emulator': `${DEFAULT_CDN}/@vant/touch-emulator`
}

export const additionalImports = {
  ...vantImports
}

export const welcomeCode = `\
<script setup lang='ts'>
import { ref } from 'vue'
import { Button } from 'vant';
import { injectVant } from './${vantInjectPlugin}'

injectVant()

const msg = ref('Hello Vant!')
</script>

<template>
  <Button type="primary">{{ msg }}</Button>
</template>
`

export const vantCss = `${DEFAULT_CDN}/vant/lib/index.css`

export const vantReplPluginCode = `\
import { getCurrentInstance } from 'vue'

import Vant from 'vant'
import '@vant/touch-emulator'

await appendStyle()

export function injectVant() {
  const instance = getCurrentInstance()
  instance.appContext.app.use(Vant)
}

export function appendStyle() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '${vantCss}'
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}
`

export type additionalFileType = Pick<File, 'filename' | 'code'> & Partial<Omit<File, 'filename' | 'code'>> & {
  canDelete?: boolean,
  /** default project depends on this file, cannot be deleted */
  deleteTips?: string,
}

export const defaultDeleteTips = 'project depends on this file, cannot be deleted'

export const additionalFiles: additionalFileType[] = [{
  filename: vantInjectPlugin,
  code: vantReplPluginCode,
  // hidden: true,

  canDelete: false,
  deleteTips: 'vant depends on this file'
}]
