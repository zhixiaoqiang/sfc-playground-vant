import { saveAs } from 'file-saver'

import index from './template/index.html?raw'
import main from './template/main.js?raw'
import pkg from './template/package.json?raw'
import config from './template/vite.config.js?raw'
import readme from './template/README.md?raw'

import { handlePackageJson } from './utils'
import type { ReplStore } from 'src/store'

export async function downloadProject (store: ReplStore) {
  console.warn('pkg', handlePackageJson(pkg, store))
  if (!confirm('Download project files?')) {
    return
  }

  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()
  console.warn('pkg', pkg)
  // basic structure
  zip.file('index.html', index)
  zip.file('package.json', handlePackageJson(pkg, store))
  zip.file('vite.config.js', config)
  zip.file('README.md', readme)

  // project src
  const src = zip.folder('src')!
  src.file('main.js', main)

  const files = store.getFiles()
  for (const file in files) {
    src.file(file, files[file])
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'vant-project.zip')
}
