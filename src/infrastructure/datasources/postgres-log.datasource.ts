import { LogModel, PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class PostgresLogDatasource implements LogDatasource {

    private readonly prisma = new PrismaClient();

    async saveLog(log: LogEntity): Promise<void> {

        const { level, message, origin } = log;

        const newLog = await this.prisma.logModel.create({
            data: {
                level: this.getSeverityLevel(level),
                message,
                origin
            }
        });
        console.log('Postgres Log created: ', newLog);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await this.prisma.logModel.findMany({
            where: {
                level: this.getSeverityLevel(severityLevel)
            }
        });

        // Convertir array de "LogModel" a array de "LogEntity" 
        const logEntities = logs.map(
            // log => this.fromLogModel(log)
            this.fromLogModel // En JavaScript se puede abreviar, son equivalentes 
        );
        
        return logEntities;
    }

    // Convertir de "LogSeverityLevel" a "SeverityLevel" 
    private getSeverityLevel(logSeverityLevel: LogSeverityLevel): SeverityLevel {

        let severityLevel: SeverityLevel = 'LOW';

        switch (logSeverityLevel) {
            case LogSeverityLevel.low:
                // No hay asignación cuando es 'low' porque ya se inicializa en 'LOW' 
                break;
            case LogSeverityLevel.medium:
                severityLevel = SeverityLevel.MEDIUM;
                break;
            case LogSeverityLevel.high:
                severityLevel = SeverityLevel.HIGH;
                break;
            default:
                // Por si se agrega un nuevo severity level en el futuro 
                throw new Error("It's not a valid Severity Level :/");
        }

        return severityLevel;

    }

    // Convertir de "LogModel" a "LogEntity" 
    private fromLogModel(logModel: LogModel): LogEntity {

        const { message, origin, level, createdAt } = logModel;

        // Convertir de "SeverityLevel" a "LogSeverityLevel" (con operadores ternarios) 
        const logSeverityLevel: LogSeverityLevel = (level === 'LOW') ? LogSeverityLevel.low 
            : (level === 'MEDIUM') ? LogSeverityLevel.medium 
            : LogSeverityLevel.high ;

        const log = new LogEntity({
            level: logSeverityLevel,
            message,
            origin,
            createdAt
        });

        return log;

    }

}
