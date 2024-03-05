import { mongo } from "mongoose";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { LogModel } from "./data/mongo/models/log.model";
import { PrismaClient } from "@prisma/client";


(async () => {
  main()
})();

async function main() {
  await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB_NAME});
  // const newLog = await LogModel.create({
  //   message: 'Test message desde mongo',
  //   origin: 'app.ts',
  //   level: 'low'
  // });
  // await newLog.save();
  // console.log('Log created', newLog);
  // const logs = await LogModel.find();
  // console.log({logs});

  // const prisma = new PrismaClient();
  // // const newLog = await prisma.logModel.create({
  // //   data: {
  // //     level: 'HIGH',
  // //     message: 'Test message desde prisma',
  // //     origin: 'app.ts'
  // //   }
  // // })
  // // console.log(newLog);
  // const logs = await prisma.logModel.findMany({where: {level: 'MEDIUM'}});
  // console.log(logs);
  
  
  Server.start();
  // console.log({envs});
  
}