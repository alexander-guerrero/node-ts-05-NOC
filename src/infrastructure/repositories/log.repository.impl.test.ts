import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';

describe('LogRepositoryImpl', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveLog should call the datasource with arguments', async () => {

        const mockLog = new LogEntity({
            origin: 'log.repository.impl.test.ts',
            message: 'Test message',
            level: LogSeverityLevel.low
        });

        await logRepositoryImpl.saveLog(mockLog);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(mockLog);

    });
    
    test('getLogs should call the datasource with arguments', async () => {

        const lowSeverity = LogSeverityLevel.low;
        
        await logRepositoryImpl.getLogs(lowSeverity);

        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);

    });
    
});
