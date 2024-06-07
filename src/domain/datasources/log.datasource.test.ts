import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts LogDatasource', () => {

    const mockNewLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'Test message',
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDatasource {

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [mockNewLog];
        }

    }
    
    test('should test the abstract class', async () => {
        
        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(mockNewLog);
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

    });

});
