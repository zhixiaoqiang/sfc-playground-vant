import { $ } from 'zx'

$.raw = async (...args) => {
  const quote = $.quote
  $.quote = (value) => value
  $(...args)
  $.quote = quote
}

// test
// const list = [
//   'pnpm check:markdownlint',
//   'pnpm check:js',
//   'pnpm check:sort-package-json',
//   'pnpm build'
// ]

// $.raw`${list.join(' && ')}` // $([list.join(' && ')])

export * from 'zx'
