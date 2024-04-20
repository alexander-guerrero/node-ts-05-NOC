import { envs } from "../config/plugins/env.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Se trabaja con las implementaciones (LogRepositoryImpl, FileSystemDatasource) de las clases abstractas (LogRepository, LogDatasource) 
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource() // Si se requiere cambiar el data source, solo se cambia la instancia de la implementación 
);

export class Server {

    public static start() {

        console.log('Server started...');

        // Mandar email
        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'alex.guelu@outlook.com',
            subject: 'Logs de sistema',
            htmlBody: `
                <h3>Logs de sistema - NOC</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Ver logs adjuntos</p>
            `
        });

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