import { PrismaClient } from '@prisma/client';
import { envs } from "./config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const prisma = new PrismaClient();
    // Crear registro 
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message from Node to PostgreSQL - Severity High',
    //         origin: 'app.ts'
    //     }
    // });
    // console.log(newLog);

    // Leer registros de la tabla 
    const logs = await prisma.logModel.findMany({
        where: {
            level: 'LOW'
        }
    });
    console.log(logs);
    console.log(logs[1].message);

    // Server.start();
}
