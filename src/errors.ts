class BaseError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
  }
}

export class CommandError extends BaseError { };
export class EventError extends BaseError { };
export class DBError extends BaseError { };
