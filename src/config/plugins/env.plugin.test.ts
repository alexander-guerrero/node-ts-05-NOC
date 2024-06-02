import { envs } from './env.plugin';

describe('env.plugin.ts', () => {
    
    test('should return env options', () => {
        
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'alex.guelu@gmail.com',
            MAILER_SECRET_KEY: 'sscfaozybdzobung',
            PROD: false,
            MONGO_URL: 'mongodb://Alexander:1234567890@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'Alexander',
            MONGO_PASS: '1234567890'
        });

    });

    test('should return error if type of env variable is incorrect', async () => {
        
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./env.plugin');
            expect(true).toBe(false);
        } catch (error) {
            // console.log(error);
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });

});
