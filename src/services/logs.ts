import { formattedDateTime } from '../utils/datetime';

enum LogLevel {
  CRITICAL = 'CRITICAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

class Logs {
  private static send(level: LogLevel, message: string) {
    const datetime = formattedDateTime();
    const levelString = '[' + level + ']';

    message = levelString + ' ' + '[' + datetime + '] ' + message

    let log;
    
    switch (level) {
      case LogLevel.CRITICAL:
        log = console.error
        break;
      case LogLevel.ERROR:
        log = console.error
        break;
      case LogLevel.WARNING:
        log = console.warn
        break;
      case LogLevel.INFO:
        log = console.info
        break;
      case LogLevel.DEBUG:
        log = console.trace
        break;
      default:
        log = console.log
        break;
    }

    log(message);
  };

  static critical(message: string) {
    Logs.send(LogLevel.CRITICAL, message);
  }

  static error(message: string) {
    Logs.send(LogLevel.ERROR, message);
  }

  static warning(message: string) {
    Logs.send(LogLevel.WARNING, message);
  }

  static info(message: string) {
    Logs.send(LogLevel.INFO, message);
  }

  static debug(message: string) {
    Logs.send(LogLevel.DEBUG, message);
  }
}

export { Logs };
