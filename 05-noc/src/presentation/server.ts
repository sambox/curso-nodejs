import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {

  public static start() {

    console.log('Server started...');


    // new SendEmailLogs(new EmailService(), fileSystemLogRepository).execute('smolina.sbs@gmail.com');



    // emailService.sendEmail({to: 'smolina.sbs@gmail.com', subject: 'Test', htmlBody: '<h1>Test</h1>'});
    // emailService.sendEmailWithFileSystemLogs( 'smolina.sbs@gmail.com');

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = 'https://google.com';
    //   // const url = 'http://localhost:3000/posts';
    //   new CheckService(fileSystemLogRepository,
    //     () => console.log(`Service ${url} is OK`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute('http://localhost:3000/posts');
    // });
    

  }

}