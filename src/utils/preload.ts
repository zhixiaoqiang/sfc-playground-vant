import { additionalImports, vantCss } from './../config'
/**
 * preload ImportsFile, reduce subsequent loading times by more than 50%
 */
export function preFetchImportsFile (imports?: Record<string, string>) {
  const fragment = document.createDocumentFragment();
  [...Object.values(imports || additionalImports), vantCss].forEach((src) => {
    const isCss = src.endsWith('.css')
    const usedLaterScript = document.createElement('link')
    usedLaterScript.href = src
    // preload
    usedLaterScript.rel = 'modulepreload'
    usedLaterScript.as = isCss ? 'style' : 'script'
    fragment.appendChild(usedLaterScript)
  })
  document.head.appendChild(fragment)
}
