import * as pino from "pino";

const pretty = pino.pretty();
pretty.pipe(process.stdout);

interface IConfig {
    hostname: string;
    logLevel: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
    logSafe: boolean;
    port: number;
    pretty: any;
    database: {
        config?: {
            db?: {
                native_parser: boolean;
            },
            pass: string;
            replset?: {
                rs_name: string;
            },
            server?: {
                poolSize: number;
                reconnectTries: number;
                reconnectInterval: number;
            },
            user: string;
        },
        development: string,
        production: string,
    };
    redis: {
        family?: number;
        password?: string;
        port: number;
        host: string;
    } | string;
}

export const database = {
    config: {
        db: { native_parser: true },
        pass: "",
        replset: { rs_name: "rs0" },
        server: { poolSize: 5, reconnectTries: Number.MAX_VALUE, reconnectInterval: 5000 },
        user: "",
    },
    development: "mongodb://localhost/olympic",
    production: "mongodb://localhost/olympic",
};

export const redisConfig = {
    family: 4,
    host: "127.0.0.1",   // Redis host
    port: 6379,          // Redis port
};

const config: IConfig = {
    database,
    hostname: "0.0.0.0",
    logLevel: "debug",
    logSafe: true,
    port: process.env.PORT && parseInt(String(process.env.PORT), 10) || 1337,
    pretty,
    redis: redisConfig,
};

export const ASSETS: any = process.env.ASSETS;

export const logConfig = {level: config.logLevel, safe: true};

export default config;
