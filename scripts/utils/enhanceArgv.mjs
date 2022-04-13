import { argv } from 'zx'

const isFalse = (value) => value === 'false' || value === false

const Argv = Object.fromEntries(Object.entries(argv).map(([key, value]) => [key, isFalse(value) ? false : value]))

export {
  Argv,
  isFalse
}

export default Argv
