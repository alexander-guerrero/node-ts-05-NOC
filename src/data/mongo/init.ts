import mongoose from 'mongoose';

interface ConnectionOptios {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect( options: ConnectionOptios ) {

        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName // Mismo nombre de "key" y "value", no es necesario poner "dbName: dbName"
            });
            console.log('MongoDB connected!');
        } catch (error) {
            console.log('MongoDB connection error');
            throw error;
        }

    }

}