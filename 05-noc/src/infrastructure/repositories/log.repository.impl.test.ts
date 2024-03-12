import { log } from "console";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";



describe('log.repository.impl.test.ts', () => {
  
  const logDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saveLog should invoke the datasource with arguments', async () => {

    const logEntity = new LogEntity({
      origin: 'test',
      message: 'test',
      level: LogSeverityLevel.low
    })
    const logRepository = new LogRepositoryImpl(logDatasource);
    logRepository.saveLog(logEntity);

    expect(logDatasource.saveLog).toHaveBeenCalledWith(logEntity);
  

  });

  test('getLogs should invoke the datasource with arguments', async () => {

      const logRepository = new LogRepositoryImpl(logDatasource);
      await logRepository.getLogs(LogSeverityLevel.low);

      expect(logDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);

  })


});