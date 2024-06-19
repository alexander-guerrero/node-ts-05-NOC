import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Pruebas en FileSystemDatasource', () => {

    const logPath = path.join(__dirname, '../../../logs');
    // console.log({logPath});

    beforeEach(() => {
        fs.rmSync(logPath, {recursive: true, force: true})
    });

    test('should create log files if they do not exist', () => {
        
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        // console.log(files);

        expect(files).toEqual([ 
            'logs-all.log', 
            'logs-high.log', 
            'logs-medium.log' 
        ]);

    });

    test('should save a log in logs-all.log', async () => {
        
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'Test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        await logDataSource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        // console.log(allLogs);

        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log and logs-medium.log', async () => {
        
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'Test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        await logDataSource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log and logs-high.log', async () => {
        
        const logDataSource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'Test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await logDataSource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));

    });

    test('should return all logs', async () => {
        
        const logDataSource = new FileSystemDatasource();

        const lowLog = new LogEntity({
            message: 'Test Low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        const mediumLog = new LogEntity({
            message: 'Test Medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        const highLog = new LogEntity({
            message: 'Test High',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await logDataSource.saveLog(lowLog);
        await logDataSource.saveLog(mediumLog);
        await logDataSource.saveLog(highLog);

        const lowLogs = await logDataSource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await logDataSource.getLogs(LogSeverityLevel.medium);
        const highLogs = await logDataSource.getLogs(LogSeverityLevel.high);

        expect(lowLogs).toEqual(expect.arrayContaining([lowLog, mediumLog, highLog]));
        expect(mediumLogs).toEqual(expect.arrayContaining([mediumLog]));
        expect(highLogs).toEqual(expect.arrayContaining([highLog]));

    });

});
