import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close();
    });
    
    test('should connect to MongoDB', async () => {
        
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(connected).toBe(true);

    });

    test('should throw an error', async () => {
        
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://Alexander:1223334444@localhost:27017/' // contraseña errada 
            });
            expect(true).toBe(false);
        } catch (error) {
            // console.log(error);
            expect(`${error}`).toContain('MongooseError');
        }

    });

});
