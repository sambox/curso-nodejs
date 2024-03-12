import mongoose from "mongoose";
import { MongoDatabase } from "./init";


describe('init.mongo.ts', () => {

  afterAll(() => {
    mongoose.connection.close();
  })

  test('init mongodb should connect to mongodb', async () => {
    console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME);
    
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!
    });
    expect(connected).toBeTruthy();

  })

  test('init mongodb should throw error', async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: 'mongodb://tuvieja:tuvieja@localhost:27017',
        dbName: 'test'
      });
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  })


});