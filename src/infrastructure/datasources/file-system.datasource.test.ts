import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';

describe('Pruebas en FileSystemDatasource', () => {

    const logPath = path.join(__dirname, '../../../logs');
    // console.log({logPath});

    beforeEach(() => {
        fs.rmSync(logPath, {recursive: true, force: true})
    });

    test('should create log files if they do not exist', () => {
        
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        // console.log(files);

        expect(files).toEqual([ 
            'logs-all.log', 
            'logs-high.log', 
            'logs-medium.log' 
        ]);

    });

});
