import { EmailPlugin } from "../../../config/plugins/email.plugin";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsUseCase {

    execute: ( to: string | string[] ) => Promise<boolean>;

}

export class SendEmailLogs implements SendEmailLogsUseCase {

    constructor(
        private readonly logRepository: LogRepository
    ) {}

    public async execute ( to: string | string[] ) {

        try {
            const emailPlugin = new EmailPlugin();
            const sent = await emailPlugin.sendEmailWithFileSystemLogs(to);
            if ( !sent ) {
                throw new Error('Email was not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Log email sent',
                origin: 'send-email-logs.ts'
            });
            this.logRepository.saveLog(log);

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${ error }`,
                origin: 'send-email-logs.ts'
            });
            this.logRepository.saveLog(log);
            
            return false;
        }

    }

}
