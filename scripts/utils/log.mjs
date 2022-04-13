import { chalk } from 'zx'
import ora from 'ora'

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
 * @param {() => Promise<void>} handleFn 中间执行的函数
 * @returns success callback
 */
export async function checkProcess (content, handleFn) {
  const stopFn = logProcessInfo(`check ${content} \n`, 'blueBright')

  if (handleFn) {
    await Promise.resolve(handleFn()).finally(() => stopFn(`${content} passed`, 'greenBright'))
    return
  }

  return stopFn(`${content} passed`, 'greenBright')
}
