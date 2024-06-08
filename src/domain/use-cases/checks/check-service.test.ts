import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check-service.ts CheckService use case', () => {

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkService = new CheckService(
        mockLogRepository,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns true', async () => {
        
        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

    test('should call errorCallback when fetch returns false', async () => {
        
        const wasOk = await checkService.execute('http://localhost:3000');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

});
