import * as Mongoose from "mongoose";
import * as pino from "pino";
import config, {database, logConfig} from "./../config";

const log = pino({...logConfig, name: "DataBase"}, config.pretty);

export const Schema = Mongoose.Schema;
export const ObjectId = Mongoose.Schema.Types.ObjectId;
export const Mixed = Mongoose.Schema.Types.Mixed;
export const ObjectValid = Mongoose.Types.ObjectId.isValid;

export let isConnected: boolean = false;
export let connection: Mongoose.Connection;

const connect = () => {
    connection = Mongoose.createConnection(database.development, database.config);
};
connect();

connection.once("open", () => {
    log.info("Database connected");
    isConnected = true;
    log.debug("Database config", database.development, database.config);
});

connection.on("disconnected", () => {
    if (!isConnected) {
        isConnected = false;
        connect();
    }
    log.info("Database disconnected");
});

connection.on("reconnected", () => {
    log.info("Database reconnected!");
});

connection.on("error", (error: any) => {
    log.error(error.name, error.message);
    connection.close();
});

export default connection;
