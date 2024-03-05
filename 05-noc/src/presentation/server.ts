import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

export class Server {

  public static async start() {

    console.log('Server started...');


    // new SendEmailLogs(new EmailService(), fileSystemLogRepository).execute('smolina.sbs@gmail.com');



    // emailService.sendEmail({to: 'smolina.sbs@gmail.com', subject: 'Test', htmlBody: '<h1>Test</h1>'});
    // emailService.sendEmailWithFileSystemLogs( 'smolina.sbs@gmail.com');

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = 'https://googlesss.com';
    //   // const url = 'http://localhost:3000/posts';
    //   new CheckServiceMultiple([fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`Service ${url} is OK`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute('http://localhost:3000/posts');
    // });
    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log({logs});


  }

}