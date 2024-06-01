import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailPlugin } from "../config/plugins/email.plugin";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';

// Se trabaja con las implementaciones (LogRepositoryImpl, FileSystemDatasource) de las clases abstractas (LogRepository, LogDatasource) 
const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource() // Si se requiere cambiar el data source, solo se cambia la instancia de la implementación 
    // new MongoLogDatasource()
    new PostgresLogDatasource()
);

export class Server {

    public static async start() {

        console.log('Server started...');

        // todo: Mandar email
        // const emailPlugin = new EmailPlugin();
        // emailPlugin.sendEmailWithFileSystemLogs(
        //     [
        //         'alex.guelu@gmail.com',
        //         'alex.guelu@outlook.com',
        //         'lguerrero@ripley.com.pe'
        //     ]
        // );
        // new SendEmailLogs(logRepository).execute(
        //     [
        //         'alex.guelu@gmail.com',
        //         'alex.guelu@outlook.com',
        //         'lguerrero@ripley.com.pe'
        //     ]
        // );

        // Prueba para mostrar los registros dependiendo del DataSource (FileSystemDatasource, MongoLogDatasource, PostgresLogDatasource) 
        const logs = await logRepository.getLogs(LogSeverityLevel.low);
        console.log(logs);

        // CronService.createJob(
        //     '*/5 * * * * *', // cronTime
        //     () => {
        //         // const url = 'http://localhost:3000';
        //         const url = 'https://google.com';
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${ url } is ok`),
        //             ( error ) => console.log( error )
        //         ).execute(url);
        //     } // onTick
        // );

    }

}