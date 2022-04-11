import type { ReplStore } from 'src/store'

const DEFAULT_VERSION = '*'

/**
 * get version map form importMap, support prefix(~ ^)
 *
 * e.g. {
 *
 *  "vue": "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.2.31/dist/runtime-dom.esm-browser.js",

 *  "@vant/use": "https://cdn.jsdelivr.net/npm/@vant/use/dist/index.esm.js"
 *
 * }
 *
 * @returns { "vue": "3.2.31", "@vant/use": "*" }
 */
export function getPackageVersionMap (imports: Record<string, string>) {
  return Object.entries(imports).reduce((resultImportMap, [pkgName, pkgPath]) => {
    const version = `${pkgPath}/`.match(/@((?=[\d^~]).+?)(?=\/)/)?.[1]
    resultImportMap[pkgName] = version ?? DEFAULT_VERSION
    return resultImportMap
  }, {} as Record<string, string>)
}

interface PackageJsonType {
  'name': string,
  'version': string,
  'dependencies': Record<string, string>,
  'devDependencies': Record<string, string>,
  [key: string]: any
}

/**
 * generate package.json with user input
 * @param pckJsonStr package.json stringify
 * @param store {ReplStore}
 * @returns
 */
export function handlePackageJson (pckJsonStr: string, store: ReplStore) {
  let pkgJson: Partial<PackageJsonType> = {}
  try {
    pkgJson = JSON.parse(pckJsonStr)
  } catch (error) {
    console.error('parse package.json error:', error)
  }

  const imports = store.getImportMap()?.imports
  if (imports) {
    const pkgVersionMap = getPackageVersionMap(imports)

    Object.entries(pkgVersionMap).forEach(([pkgName, version]) => {
      pkgJson.dependencies = {
        ...pkgJson.dependencies,
        [pkgName]: version !== DEFAULT_VERSION ? version : pkgJson.dependencies?.[pkgName] ?? version
      }
    })
  }

  return JSON.stringify(pkgJson, null, 2)
}
