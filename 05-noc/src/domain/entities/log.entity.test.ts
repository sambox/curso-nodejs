import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log.entity.ts', () => {

  const logEntityData = { origin: 'test', level: LogSeverityLevel.low, message: 'test message' };

  test('should create a LogEntity instance', () => {
    const log = new LogEntity(logEntityData);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logEntityData.message);
    expect(log.level).toBe(logEntityData.level);
    expect(log.origin).toBe(logEntityData.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance from a json', () => {

    const json = `{"level":"high","message":"https://googlesss.com is NOT ok. TypeError: fetch failed","createdAt":"2024-03-06T22:19:20.595Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('https://googlesss.com is NOT ok. TypeError: fetch failed');
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);


  });

  test('should create a LogEntity instance fromObject', () => {
    const log = LogEntity.fromObject(logEntityData);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logEntityData.message);
    expect(log.level).toBe(logEntityData.level);
    expect(log.origin).toBe(logEntityData.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

});