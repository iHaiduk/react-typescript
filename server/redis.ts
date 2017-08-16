import * as Redis from "ioredis";
import * as pino from "pino";
import config, {logConfig, redisConfig} from "./config";

export const redis = new Redis(redisConfig);
const log = pino({...logConfig, name: "Redis"}, config.pretty);

redis.on("connect", () => {
    log.info("Redis connected!");
    log.debug("Redis config", redisConfig);
});

redis.on("close", () => {
    log.info("Redis closed!");
});

redis.on("reconnecting", () => {
    log.debug("Redis reconnecting!");
});

redis.on("error", (error) => {
    log.error(error);
    log.debug("Redis config", redisConfig);
});

export default redis;
