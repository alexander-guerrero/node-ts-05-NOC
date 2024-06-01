import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class PostgresLogDatasource implements LogDatasource {

    private readonly prisma = new PrismaClient();
    // Para la conversión de "LogSeverityLevel" a "SeverityLevel"
    private readonly severityEnum = {
        low: SeverityLevel.LOW,
        medium: SeverityLevel.MEDIUM,
        high: SeverityLevel.HIGH
    }

    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await this.prisma.logModel.create({
            data: {
                ...log, // spread operator 
                level: this.severityEnum[log.level]
            }
        });
        console.log('Postgres Log created: ', newLog);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await this.prisma.logModel.findMany({
            where: {
                level: this.severityEnum[severityLevel]
            }
        });

        // Convertir array de "LogModel" a array de "LogEntity" 
        // Se reutiliza método estático de la clase "LogEntity" 
        const logEntities = logs.map(
            // log => LogEntity.fromObject(log)
            LogEntity.fromObject // En JavaScript se puede abreviar, son equivalentes 
        );
        
        return logEntities;
    }

}
