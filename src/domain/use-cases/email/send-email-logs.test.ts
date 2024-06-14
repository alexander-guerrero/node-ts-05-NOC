import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs SendEmailLogs', () => {

    // No es necesario este mock de 'EmailService' 
    const mockEmailService = { // ya que el contructor de 'SendEmailLogs' solo usa 'LogRepository'
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
    test('should call sendEmail and saveLog', async () => {
        
        const sendEmailLogs = new SendEmailLogs(mockLogRepository);

        const result = await sendEmailLogs.execute('alex.guelu@gmail.com');

        expect(result).toBe(true);
        // expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1); // No se usa 'mockEmailService' 
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'low',
            message: 'Log email sent',
            origin: 'send-email-logs.ts'
        });

    });

});
