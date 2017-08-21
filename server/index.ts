import * as http from "http";
import * as pino from "pino";
import config, {logConfig} from "./config";
import "./redis";
import application from "./server";
import socket from "./socket";

const log = pino({...logConfig, name: "Application"}, config.pretty);
const server = http.createServer(application.callback());

socket(server);

server.listen(config.port, config.hostname, () => {
    log.info(`Server running at http://${config.hostname}:${config.port}/`);
});

function clearDump() {
    try {
        global.gc();
    } catch (e) {
        if (process.env.NODE_ENV === "production") {
            log.warn("You must run program with 'node --expose-gc' or 'npm start'");
            process.exit();
        }
    }
}

if (process.env.NODE_ENV === "production") {
    setInterval(clearDump, 15000);
}
