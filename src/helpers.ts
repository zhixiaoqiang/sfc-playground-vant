import { vantImports } from './config'

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
  }]

  someBugImportData.forEach(({ name, filepath }) => {
    if (importMap[name]?.endsWith(filepath) && vantImports[name]) {
      importMap[name] = vantImports[name]
    }
  })
}
