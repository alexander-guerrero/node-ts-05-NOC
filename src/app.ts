import { Server } from "./presentation/server";

(() => {
    main();
})();

function main() {
    // Server.start();
    console.log(process.env.MAILER_EMAIL);
}
