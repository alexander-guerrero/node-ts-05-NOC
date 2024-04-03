import { CronJob } from 'cron';

export class Server {

    public static start() {

        console.log('Server started...');

        const job = new CronJob(
            '*/3 * * * * *', // cronTime
            function () {
                const date = new Date();
                console.log('You will see this message every 3 seconds', date);
            }, // onTick
            null, // onComplete
            true, // start
            'America/Los_Angeles' // timeZone
        );
        // job.start() is optional here because of the fourth parameter set to true.

    }

}