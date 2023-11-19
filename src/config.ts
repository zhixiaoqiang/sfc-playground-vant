import { File } from '@vue/repl'

export enum npmCdnEnum {
  jsdelivr = 'https://cdn.jsdelivr.net/npm',
  unpkg = 'https://unpkg.com',
  skypack = 'https://cdn.skypack.dev',
  cndjs = 'https://cdnjs.com/libraries'
}

export const DEFAULT_CDN = npmCdnEnum.unpkg

/**
 * get cdn url by package name & filePath
 * if use unpkg cdn, url will add query params: ?module'
 */
export const getCdnUrl = (npmName: string, filePath?: string) => {
  if (DEFAULT_CDN === npmCdnEnum.unpkg) {
    return `${DEFAULT_CDN}/${npmName}?module`
  }

  return `${DEFAULT_CDN}/${npmName}/${filePath}`
}

/** get vue runtime cdn url buy version */
export const getVueRuntimeURL = (version?: string) => getCdnUrl('vue' + (version ? `@${version}` : ''))

/** get vue compiler cdn url buy version */
export const getVueCompilerURL = (version: string) => `${DEFAULT_CDN}/@vue/compiler-sfc@${version}/dist/compiler-sfc.esm-browser.js`

export const vantCss = `${DEFAULT_CDN}/vant/lib/index.css`

export const additionalImportsCss = [
  vantCss
]

/** get vant cdn url buy version */
export const getVantURL = (version?: string) => {
  if (version) {
    return `${DEFAULT_CDN}/vant@${version}/lib/vant.es.js`
  }

  return `${DEFAULT_CDN}/vant/lib/vant.es.js`
}

export const defaultMainFile = 'App.vue'
export const vantInjectPlugin = 'vant-inject-plugin.js'

export const vantImports: Record<string, string> = {
  vant: getVantURL(),
  '@vant/use': getCdnUrl('@vant/use', 'dist/index.esm.mjs'),
  '@vant/popperjs': getCdnUrl('@vant/popperjs', 'dist/index.esm.mjs'),
  '@vant/touch-emulator': `${DEFAULT_CDN}/@vant/touch-emulator`
}

export const vueImports: Record<string, string> = {
  vue: getVueRuntimeURL()
}

export const additionalImports: Record<string, string> = {
  ...vantImports,
  '@vue/shared': getCdnUrl('@vue/shared', 'dist/shared.esm-bundler.js')
}

export const welcomeCode = `\
<script setup lang='ts'>
import { ref } from 'vue'
import { Button } from 'vant';
import { injectVant } from './vant-inject-plugin.js'

injectVant()
const msg = ref('Hello Vant!')
</script>

<template>
  Button：
  <Button type="primary">{{ msg }}</Button>
  <van-divider />
  van-button：
  <van-button type="primary">{{ msg }}</van-button>
  <van-divider />
  van-Button：
  <van-Button type="primary">{{ msg }}</van-Button>
</template>
`

export const vantReplPluginCode = `\
import { getCurrentInstance } from 'vue'

import Vant from 'vant'
import '@vant/touch-emulator'

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

await appendStyle()
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
