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

    console.log(message);
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
