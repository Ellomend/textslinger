// Typescript LoggerService class with static method 'log(data: any, level = 'default')
// logger service logs console log message with corresponding level
// default console.log
// also level argument should be one of 'debug' or 'info' or 'default' or 'warn' or 'error'
/*
TODO: maybe we can avoid having any here
something like this
interface Loggable {
  toString(): string;
}

function log<T extends Loggable>(item: T) {
  console.log(item.toString());
}
*/

// TODO: maybe quasar have a better way to detect dev mode
// and this should not be defined here
const isProd = process.env.NODE_ENV === 'production'

type LogLevel = 'debug' | 'info' | 'default' | 'warn' | 'error';

export class LoggerService {
  /* eslint-disable no-console */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static log(data: any, level: LogLevel = 'default'): void {
    if (isProd) return
    switch (level) {
      case 'debug':
        console.debug(data)
        break
      case 'info':
        console.info(data)
        break
      case 'warn':
        console.warn(data)
        break
      case 'error':
        console.error(data)
        break
      case 'default':
      default:
        console.log(data)
    }
    /* eslint-enable no-console */
  }
}

export const ll = LoggerService.log
