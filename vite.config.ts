import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import execa from 'execa'

const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

export default defineConfig({
  base: './',
  plugins: [vue()],
  define: {
    __VUE_COMMIT__: JSON.stringify(commit),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
  },
  optimizeDeps: {
    exclude: ['@vue/repl']
  }
})
