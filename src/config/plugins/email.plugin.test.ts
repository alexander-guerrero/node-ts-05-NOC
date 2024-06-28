import nodemailer from 'nodemailer';
import { EmailPlugin } from './email.plugin';

describe('EmailPlugin', () => {

    const mockSendMail = jest.fn();

    // Mock al createTransport 
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });
    
    const emailPlugin = new EmailPlugin();

    test('should send email', async () => {
        
        const emailSent = await emailPlugin.sendEmailWithFileSystemLogs('alex.guelu@gmail.com');

        expect(emailSent).toBeTruthy();
        expect(mockSendMail).toHaveBeenCalledWith({
            to: 'alex.guelu@gmail.com',
            subject: 'Logs del servidor',
            html: `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Ver logs adjuntos</p>
        `,
            attachments: expect.any(Array)
        });

    });

    test('should send email with attachments', async () => {

        const email = 'alex.guelu@gmail.com';
        const emailSent = await emailPlugin.sendEmailWithFileSystemLogs(email);

        expect(emailSent).toBeTruthy();
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Ver logs adjuntos</p>
        `,
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });

    });

});
