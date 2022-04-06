// / <reference types="vite/client" />

// Global compile-time constants
declare let __DEV__: boolean
declare let __TEST__: boolean
declare let __BROWSER__: boolean
declare let __GLOBAL__: boolean
declare let __ESM_BUNDLER__: boolean
declare let __ESM_BROWSER__: boolean
declare let __NODE_JS__: boolean
declare let __SSR__: boolean
declare let __VUE_COMMIT__: string
declare let __VERSION__: string
declare let __COMPAT__: boolean

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'file-saver' {
  export function saveAs(blob: Blob, name: string): void
}
