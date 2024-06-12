import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service-multiple.ts CheckServiceMultiple use case', () => {

    const mockLogRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const mockLogRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const mockLogRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const mockLogRepositories = [
        mockLogRepository1,
        mockLogRepository2,
        mockLogRepository3
    ];
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        mockLogRepositories,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns true', async () => {
        
        const wasOk = await checkServiceMultiple.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

    test('should call errorCallback when fetch returns false', async () => {
        
        const wasOk = await checkServiceMultiple.execute('http://localhost:3000');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

});
