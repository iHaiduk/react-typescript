import {redisConfig} from "_config";
import * as Socket from "socket.io";
import * as sRedis from "socket.io-redis";

export let io: any;

export default (server: any) => {
    io = Socket(server);
    io.adapter(sRedis(redisConfig));
};
