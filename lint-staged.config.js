module.exports = {
  // './**/*.{js?(x),ts?(x)}': [
  //   'eslint --fix',
  //   'git add'
  // ],
  './**/*.md': 'pnpm markdownlint-fix',
  'package.json': 'sort-package-json',
  './**/*.{js?(x),ts?(x),mjs,.vue}': [
    'eslint --fix',
    'git add'
  ]
}
