
export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}


export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor({ level, message, origin, createdAt = new Date() }: LogEntityOptions) {
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string = '{}'): LogEntity => {
    json = json === '' ? '{}' : json;
    const {message, level, createdAt, origin } = JSON.parse(json);
    if (!message || !level || !createdAt) {
      throw new Error('Invalid log');
    }

    const log = new LogEntity({level, message, createdAt, origin});
    log.createdAt = new Date(createdAt);
    return log;

  }

  static fromObject = (object: {[key: string]: any}): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({message, level, createdAt, origin});
    return log;
  }

}