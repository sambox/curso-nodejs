import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

const origin = 'check-service.ts';

export class CheckServiceMultiple implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback) {
  }

  private callLogsRepositories(log: LogEntity) {
    this.logRepository.forEach(repository => repository.saveLog(log));
  }

  async execute(url: string): Promise<boolean> {

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({level: LogSeverityLevel.low, message: `Service ${url} working`, origin});
      this.callLogsRepositories(log);
      this.successCallback && this.successCallback();
      return true
    } catch (error) {
      const errorMessage = `${url} is NOT ok. ${error}`;
      const log = new LogEntity({level: LogSeverityLevel.high, message: errorMessage, origin});
      this.callLogsRepositories(log);
      this.errorCallback && this.errorCallback(`${errorMessage}`);
      return false;
    }

  }

}