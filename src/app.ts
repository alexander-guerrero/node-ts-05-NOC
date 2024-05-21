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

    // Crear una colección ~ tabla, documento ~ registro 
    // const newLog = await LogModel.create({
    //     message: 'Test message from Node to MongoDB - Severity High',
    //     origin: 'app.ts',
    //     level: 'high'
    // });
    // await newLog.save();
    // console.log(newLog);

    // Leer documentos ~ registros de la colección ~ tabla 
    const logs = await LogModel.find();
    console.log(logs);
    console.log(logs[3].message);

    // Server.start();
}
