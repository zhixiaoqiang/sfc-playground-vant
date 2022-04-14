import { argv } from 'zx'

/**
 * value === 'false' || value === false
 */
const isFalse = (value) => value === 'false' || value === false

/**
 * if argv value isFalse convert to false
 */
const Argv = Object.fromEntries(Object.entries(argv).map(([key, value]) => [key, isFalse(value) ? false : value]))

export {
  Argv,
  isFalse
}

export default Argv
