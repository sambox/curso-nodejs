import path from "path";
import fs from "fs";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


describe('file-system.datasource.ts', () => {

  const logPath = path.join(__dirname, '../../../logs');
  
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true});
  });

  test('should create log files if them not exist', async () => {

    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);

  });

  test('should save a log in logs-all.log file', () => {

    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.low,
      origin: 'test'
    });

    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log file and medium', () => {

    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.medium,
      origin: 'test'
    });

    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log file and high', () => {

    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.high,
      origin: 'test'
    });

    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('should get logs from logs-all.log', async () => {

    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.low,
      origin: 'test' 
    });
    const logMedium = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.medium,
      origin: 'test' 
    });
    const logHigh = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.high,
      origin: 'test' 
    });

    logDatasource.saveLog(logLow);
    logDatasource.saveLog(logMedium);
    logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    
  })

  test('should not throw an error if path exists', () => {
    new FileSystemDatasource();
    new FileSystemDatasource();
    expect(true).toBeTruthy();
  })

  test('should throw an error if severity level is invalid', async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = 'super-MEGA-high' as LogSeverityLevel;

    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toContain('Invalid severity level');
    }
  });

})