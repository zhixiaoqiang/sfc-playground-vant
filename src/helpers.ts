import { additionalImports, vantImports, vueImports } from './config'

/**
 * fix wrong cdn url already in use
 * @param importMap { "vant": "xx" }
 */
export const convertBugImportMapCdnUrl = (importMap: Record<string, string>) => {
  const someBugImportData = [{
    name: '@vant/use',
    filepath: '/dist/index.esm.js'
  }, {
    name: '@vant/popperjs',
    filepath: '/dist/esm/index.js'
  }, {
    name: 'vue',
    filepath: '/dist/runtime-dom.esm-browser.js'
  }]

  /**
   * fix some missing import
   * @param importMap { "vant": "xx" }
   */
  const someMissingImportData = ['@vue/shared']

  someBugImportData.forEach(({ name, filepath }) => {
    if (importMap[name]?.endsWith(filepath)) {
      if (vantImports[name]) {
        importMap[name] = vantImports[name]
      } else if (vueImports[name]) {
        importMap[name] = vueImports[name]
      }
    }
  })

  someMissingImportData.forEach((name) => {
    if (!importMap[name]) {
      importMap[name] = additionalImports[name] || vueImports[name]
    }
  })
}
