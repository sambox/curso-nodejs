import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = './logs';
  private readonly allLogsPath = `${this.logPath}/logs-all.log`;
  private readonly mediumLogsPath = `${this.logPath}/logs-medium.log`;
  private readonly highLogsPath = `${this.logPath}/logs-high.log`;

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
    });
  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;
    fs.appendFileSync(this.allLogsPath, logAsJson);
    if (log.level === LogSeverityLevel.low) return;
    if (log.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
      return;
    }
    fs.appendFileSync(this.highLogsPath, logAsJson);
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    if (content === '') {
      return [];
    }
    return content.split('\n').filter(Boolean).map(LogEntity.fromJson);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);        
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error('Invalid severity level');
    }
  }

}