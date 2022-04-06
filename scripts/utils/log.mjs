import { chalk } from 'zx'
import ora from 'ora'

// type ColorType = (typeof chalk)['Color']

/**
 * 打印流程信息
 * @param {String} content
 * @param {(typeof chalk)['Color']} colorType
 * @returns {(content: String, colorType: (typeof chalk)['Color']) => void}
 */
export function logProcessInfo (content, colorType) {
  const spinner = ora(`${chalk[colorType](content)}`).start()
  return (content, colorType) => {
    spinner.succeed(`${chalk[colorType](content)}`)
    spinner.stop()
  }
}

/**
 * 打印检测流程信息
 * @param {String} content e.g. build
 * @param {() => Promise<void>} cb 中间执行的函数
 * @returns success callback
 */
export async function checkProcess (content, cb) {
  const stopFn = logProcessInfo(`check ${content} \n`, 'blueBright')

  if (cb) {
    await Promise.resolve(cb()).finally(() => stopFn(`${content} passed`, 'greenBright'))
    return
  }

  return stopFn(`${content} passed`, 'greenBright')
}
