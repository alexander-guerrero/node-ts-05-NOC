import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

// Se trabaja con las implementaciones (LogRepositoryImpl, FileSystemDatasource) de las clases abstractas (LogRepository, LogDatasource) 
const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource() // Si se requiere cambiar el data source, solo se cambia la instancia de la implementación 
);

export class Server {

    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *', // cronTime
            () => {
                // const url = 'http://localhost:3000';
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error )
                ).execute(url);
            } // onTick
        );

    }

}