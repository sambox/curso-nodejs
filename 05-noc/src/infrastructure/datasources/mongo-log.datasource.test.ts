import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";
import { log } from "util";


describe('mongo-log.datasource.ts', () => {
  
  const logDatasource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: 'test',
    origin: 'test',
  })
  
  beforeAll( async () => {
    await MongoDatabase.connect(
      {
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
      }
    );
  })

  afterEach( async () => {
    await LogModel.deleteMany({});
  })

  afterAll( async () => {
    mongoose.connection.close();
  })

  test('should save a log', async () => {


    const logSpy = jest.spyOn(console, 'log');

    

    await logDatasource.saveLog(log);

    expect(logSpy).toHaveBeenCalledWith('Mongo Log Created: ', expect.any(String));

  })

  test('should get logs', async () => {

    await logDatasource.saveLog(log);
    const logs = await logDatasource.getLogs(LogSeverityLevel.low);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.low);

  })

});