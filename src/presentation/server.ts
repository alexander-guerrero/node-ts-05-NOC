import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Se trabaja con las implementaciones (LogRepositoryImpl, FileSystemDatasource) de las clases abstractas (LogRepository, LogDatasource) 
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource() // Si se requiere cambiar el data source, solo se cambia la instancia de la implementación 
);

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...');

        // todo: Mandar email
        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(
        //     [
        //         'alex.guelu@gmail.com',
        //         'alex.guelu@outlook.com',
        //         'lguerrero@ripley.com.pe'
        //     ]
        // );
        new SendEmailLogs(emailService, fileSystemLogRepository).execute(
            [
                'alex.guelu@gmail.com',
                'alex.guelu@outlook.com',
                'lguerrero@ripley.com.pe'
            ]
        );

        // CronService.createJob(
        //     '*/5 * * * * *', // cronTime
        //     () => {
        //         // const url = 'http://localhost:3000';
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`),
        //             ( error ) => console.log( error )
        //         ).execute(url);
        //     } // onTick
        // );

    }

}